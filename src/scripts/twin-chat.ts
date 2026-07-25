/**
 * twin-chat — client-side chat island for the digital-twin homepage
 * (src/pages/index.astro).
 *
 * Vanilla TypeScript, no framework/runtime dependency. Drives the
 * conversation state machine (idle -> guarding -> generating -> done, plus
 * refused/error) against either:
 *
 *   - a live Supabase Edge Function (`PUBLIC_TWIN_ENDPOINT` set) speaking the
 *     SSE contract described in supabase/functions/digital-twin-chat/, or
 *   - a canned local mock (endpoint unset) so the page is demoable before
 *     the backend is deployed/wired up — see the `// TODO(T11)` seam below.
 *
 * DOM contract this script expects (all rendered by index.astro):
 *   #thread                      - the conversation container
 *   #starterChips                - wraps N `.chip-wrap[data-en][data-zh]`
 *                                    elements, each containing one
 *                                    `button.chip` (StarterChip.astro)
 *   form.composer, #composer-input, .composer .send  (Composer.astro)
 *   .composer-wrap                - wraps the composer + honesty note
 *   #tpl-visitor-bubble           - <template> wrapping VisitorBubble.astro
 *   #tpl-thinking-bubble          - <template> wrapping TwinBubble.astro
 *                                    (guarding/pre-stream indicator)
 *   #tpl-answer-bubble            - <template> wrapping TwinBubble.astro
 *                                    (the real answer, incl. refused/error
 *                                    variants — see the flag spans inside)
 *   #tpl-retry-button             - <template> wrapping Button.astro
 *   #cite-cid-harvest             - hidden CitedFact.astro instance, used
 *                                    only to read its Astro scoped-style
 *                                    attribute so dynamically-created
 *                                    citation <mark> elements pick up the
 *                                    same styling (see harvestCiteCidAttr).
 *
 * Elements cloned from a <template> keep whatever data-astro-cid-* scoping
 * attribute Astro stamped on them at build time, so they render with the
 * *exact* component CSS — no style duplication needed here. Elements this
 * script creates from scratch (a `<mark>` for a cited fact) don't get that
 * attribute automatically, which is why the CitedFact scope is harvested
 * once and re-applied manually.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';

type ConversationState = 'idle' | 'guarding' | 'generating' | 'done' | 'refused' | 'error';

interface AnswerSegment {
  text: string;
  /** corpus source id, if this segment should render as a CitedFact. */
  cite?: string;
}

interface MockAnswer {
  id: string;
  sources: string[];
  segments: AnswerSegment[];
}

interface SseEventData {
  state?: string;
  token?: string;
  message?: string;
  session_id?: string;
}

interface HistoryTurn {
  role: 'user' | 'assistant';
  content: string;
}

// ---------------------------------------------------------------------------
// Endpoint config
// ---------------------------------------------------------------------------

// Set at build time via .env / hosting provider config. Left unset in local
// dev and in this repo's default build -> mock fallback below.
const ENDPOINT: string | undefined = import.meta.env.PUBLIC_TWIN_ENDPOINT;

// ---------------------------------------------------------------------------
// Mock corpus (TODO(T11): replace mock with live endpoint)
// ---------------------------------------------------------------------------
// These four answers mirror the component-kit demo content (src/pages/_kit.astro)
// and the facts recorded in CLAUDE.md, so the mock is honest rather than
// placeholder lorem ipsum. Once PUBLIC_TWIN_ENDPOINT is set and the backend's
// context-assembly + Claude call seams (supabase/functions/digital-twin-chat/index.ts)
// are wired up, this whole block — and the `runMock` function that consumes
// it — can be deleted; `runLive` is already the real code path.
const MOCK_ANSWERS: MockAnswer[] = [
  {
    id: 'dentall-perf',
    sources: ['dentall-perf-10x', 'dentall-throughput'],
    segments: [
      { text: 'Hi — at Dentall I owned backend performance and the healthcare compliance layer. ' },
      { text: 'The headline: a core clinical query dropped from ' },
      { text: '~5s to ~0.5s', cite: 'dentall-perf-10x' },
      { text: ', roughly a 10× cut. After the fix the service held ' },
      { text: '40–60 RPS', cite: 'dentall-throughput' },
      { text: ' steadily.' },
    ],
  },
  {
    id: 'not-on-resume',
    sources: [],
    segments: [
      {
        text: "What's not on the résumé: most of the Dentall compliance work was translating a rule spreadsheet nobody wanted to own into ",
      },
      { text: '10,000+ Gherkin scenarios', cite: 'dentall-nhi-scenarios' },
      {
        text: " that outlived three re-orgs. That's not a bullet point — it's the boring persistence that made the bullet points true.",
      },
    ],
  },
  {
    id: 'six-person-team',
    sources: ['dentall-team-6'],
    segments: [
      { text: 'Yes and no, and the distinction matters: ' },
      { text: 'six engineers', cite: 'dentall-team-6' },
      {
        text:
          ' reported into the work, but that was technical leadership — architecture calls, code review, the ' +
          'DDD/BDD direction — not people-management. If the question is "have you managed headcount," honestly, ' +
          'no. If it\'s "have you set technical direction for a team," yes.',
      },
    ],
  },
  {
    id: 'tech-debt-zh',
    sources: ['dentall-coverage'],
    segments: [
      {
        text:
          '技術債這件事，我習慣先分類再還：哪些是「拖慢新功能」的債，哪些是「隨時會炸」的債。在 Dentall，我們用 DDD ' +
          '把邊界劃清楚，再用 BDD/Gherkin 把行為釘住，重構時才不怕改壞既有規則。測試覆蓋率從 ',
      },
      { text: '~50% 拉到 ~80%', cite: 'dentall-coverage' },
      { text: '，是還債的副產品，不是目標本身。' },
    ],
  },
];

const FALLBACK_ANSWER: MockAnswer = {
  id: 'fallback',
  sources: [],
  segments: [
    {
      text:
        'I can speak best to my engineering work at Dentall (and before that HiTrust, Synnex), or how I think ' +
        'about tradeoffs. Try one of the starter questions above, or ask about a specific system, decision, or ' +
        'technology.',
    },
  ],
};

// Demo hooks so every state is reachable without a live backend: type a
// question containing one of these to see the refused/error UI.
const REFUSAL_TRIGGERS = [
  'ignore previous instructions',
  'ignore your instructions',
  'disregard your',
  'system prompt',
  'jailbreak',
  'act as',
  'weather',
  'recipe',
  'stock price',
  'crypto price',
  'celebrity gossip',
];
const ERROR_TRIGGERS = ['simulate error', 'trigger error'];

type MockVerdict = { kind: 'answer'; answer: MockAnswer } | { kind: 'refused' } | { kind: 'error' };

function classifyQuestion(questionRaw: string): MockVerdict {
  const q = questionRaw.toLowerCase();
  if (ERROR_TRIGGERS.some((t) => q.includes(t))) return { kind: 'error' };
  if (REFUSAL_TRIGGERS.some((t) => q.includes(t))) return { kind: 'refused' };
  if (q.includes('dentall') || q.includes('perf') || q.includes('rps') || q.includes('latency')) {
    return { kind: 'answer', answer: MOCK_ANSWERS[0] };
  }
  if (q.includes('résumé') || q.includes('resume') || questionRaw.includes('履歷') || q.includes('not on')) {
    return { kind: 'answer', answer: MOCK_ANSWERS[1] };
  }
  if (q.includes('team') || q.includes('lead') || questionRaw.includes('團隊') || questionRaw.includes('管理')) {
    return { kind: 'answer', answer: MOCK_ANSWERS[2] };
  }
  if (questionRaw.includes('技術債') || q.includes('tech debt') || q.includes('debt')) {
    return { kind: 'answer', answer: MOCK_ANSWERS[3] };
  }
  return { kind: 'answer', answer: FALLBACK_ANSWER };
}

// ---------------------------------------------------------------------------
// Small utils
// ---------------------------------------------------------------------------

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function genSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function parseSseEvent(raw: string): { event: string; data: SseEventData } | null {
  let event = 'message';
  const dataLines: string[] = [];
  for (const line of raw.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
  }
  if (dataLines.length === 0) return null;
  try {
    return { event, data: JSON.parse(dataLines.join('\n')) as SseEventData };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Markdown rendering (safe subset) — shared by the live streaming/finalize
// path below. `marked` turns a small Markdown subset into HTML; DOMPurify
// then strips that HTML down to an allowlist before it's ever assigned to
// `.innerHTML`. Model output is NEVER trusted as HTML directly — only the
// DOMPurify-sanitized string is.
// ---------------------------------------------------------------------------

marked.setOptions({ gfm: true, breaks: true });

const MD_ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'code', 'pre', 'ul', 'ol', 'li', 'a', 'blockquote'];
const MD_ALLOWED_ATTR = ['href', 'title', 'class'];
// http(s)/mailto only, plus in-page (#…) and root-relative (/…) links.
// Blocks `javascript:`/`data:`/etc. even though DOMPurify's own default
// ALLOWED_URI_REGEXP already excludes those — belt and suspenders on the one
// attribute (href) that can execute code.
const SAFE_HREF_RE = /^(https?:|mailto:|#|\/(?!\/))/i;

// Runs once at module load. Adds rel/target to every sanitized <a> (not
// something a DOMPurify ALLOWED_ATTR entry can express) and double-checks
// href against SAFE_HREF_RE, stripping anything that doesn't match.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName !== 'A') return;
  const href = node.getAttribute('href');
  if (!href || !SAFE_HREF_RE.test(href)) {
    node.removeAttribute('href');
    return;
  }
  node.setAttribute('rel', 'noopener');
  node.setAttribute('target', '_blank');
});

/**
 * Render a safe Markdown subset (bold/italic/inline code/fenced code/lists/
 * links/paragraphs/line breaks) to a sanitized HTML string. No raw HTML and
 * no images pass through — see MD_ALLOWED_TAGS/MD_ALLOWED_ATTR above. Never
 * assign unsanitized model output to innerHTML; only this function's return
 * value is safe to.
 */
function renderMarkdownSubset(md: string): string {
  const html = marked.parse(md, { async: false });
  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS: MD_ALLOWED_TAGS, ALLOWED_ATTR: MD_ALLOWED_ATTR });
  // This page doesn't load the site's Tailwind base styles (see index.astro's
  // header comment / TwinLayout) so a bare <p> would carry the browser's
  // default ~1em margin into the tightly-spaced chat bubble. Zero that out,
  // keeping a small gap only *between* multiple paragraphs, never at the top
  // or bottom of the bubble's text.
  const scratch = document.createElement('div');
  scratch.innerHTML = clean;
  scratch.querySelectorAll('p').forEach((p, i) => {
    (p as HTMLElement).style.margin = i === 0 ? '0' : '0.75em 0 0';
  });
  return scratch.innerHTML;
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

function init(): void {
  const threadEl = document.querySelector<HTMLElement>('#thread');
  const chipsEl = document.querySelector<HTMLElement>('#starterChips');
  const composerWrapEl = document.querySelector<HTMLElement>('.composer-wrap');
  const formEl = document.querySelector<HTMLFormElement>('form.composer');
  const inputEl = document.querySelector<HTMLInputElement>('#composer-input');
  const sendBtnEl = document.querySelector<HTMLButtonElement>('.composer .send');
  const tplVisitorEl = document.querySelector<HTMLTemplateElement>('#tpl-visitor-bubble');
  const tplThinkingEl = document.querySelector<HTMLTemplateElement>('#tpl-thinking-bubble');
  const tplAnswerEl = document.querySelector<HTMLTemplateElement>('#tpl-answer-bubble');
  const tplRetryEl = document.querySelector<HTMLTemplateElement>('#tpl-retry-button');

  if (
    !threadEl ||
    !chipsEl ||
    !composerWrapEl ||
    !formEl ||
    !inputEl ||
    !sendBtnEl ||
    !tplVisitorEl ||
    !tplThinkingEl ||
    !tplAnswerEl ||
    !tplRetryEl
  ) {
    console.warn('[digital-twin] chat island: expected DOM structure missing, aborting init.');
    return;
  }

  const thread = threadEl;
  const chips = chipsEl;
  const composerWrap = composerWrapEl;
  const form = formEl;
  const input = inputEl;
  const sendBtn = sendBtnEl;
  const tplVisitor = tplVisitorEl;
  const tplThinking = tplThinkingEl;
  const tplAnswer = tplAnswerEl;
  const tplRetry = tplRetryEl;

  const citeCidAttr = harvestCiteCidAttr();
  const sessionId = genSessionId();
  const history: HistoryTurn[] = [];
  let busy = false;
  let lastQuestion = '';
  let state: ConversationState = 'idle';

  function setState(next: ConversationState): void {
    state = next;
    document.documentElement.dataset.twinState = state;
  }

  // -- template cloning ------------------------------------------------

  function cloneTemplate(tpl: HTMLTemplateElement): HTMLElement {
    const node = tpl.content.firstElementChild;
    if (!node) throw new Error(`template #${tpl.id} is empty`);
    return node.cloneNode(true) as HTMLElement;
  }

  function harvestCiteCidAttr(): { name: string; value: string } | null {
    const harvestMark = document.querySelector<HTMLElement>('#cite-cid-harvest mark.cite');
    if (!harvestMark) return null;
    const attrName = harvestMark.getAttributeNames().find((n) => n.startsWith('data-astro-cid'));
    if (!attrName) return null;
    const value = harvestMark.getAttribute(attrName);
    return value === null ? null : { name: attrName, value };
  }

  function makeCiteMark(text: string, source: string): HTMLElement {
    const mark = document.createElement('mark');
    mark.className = 'cite';
    mark.title = `corpus: ${source}`;
    mark.textContent = text;
    if (citeCidAttr) mark.setAttribute(citeCidAttr.name, citeCidAttr.value);
    return mark;
  }

  // Finds `phrase` (a raw slice of the Markdown source, pre-render) across
  // the rendered text under `root` and wraps the matching text in one or
  // more makeCiteMark(...) elements. Searches across the *concatenation* of
  // all descendant text nodes, not node-by-node: a cited phrase the model
  // wrapped in **bold**/`code` lands in its own <strong>/<code> text node,
  // so it may not be contiguous within a single node even though it reads
  // as one run of text. If the match itself straddles an element boundary,
  // it's wrapped as multiple sibling <mark>s (one per intersected node) —
  // CitedFact's `box-decoration-break: clone` is exactly what makes that
  // read as one seamless highlight. If the phrase isn't found at all, it's
  // left unmarked — the source id still surfaces via
  // finalizeSources/extractCitedSources.
  function wrapCitedPhrase(root: HTMLElement, rawPhrase: string, source: string): void {
    // Strip inline-emphasis syntax the renderer already consumed into tags
    // (**bold**, __bold__, `code`, *italic*, _italic_) so the search string
    // matches what's actually in the rendered text nodes.
    const phrase = rawPhrase.replace(/\*\*|__|`|\*|_/g, '');
    if (!phrase) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let n = walker.nextNode();
    while (n) {
      textNodes.push(n as Text);
      n = walker.nextNode();
    }

    let full = '';
    const nodeStarts: number[] = [];
    for (const node of textNodes) {
      nodeStarts.push(full.length);
      full += node.data;
    }
    const matchStart = full.indexOf(phrase);
    if (matchStart === -1) return;
    const matchEnd = matchStart + phrase.length;

    textNodes.forEach((node, i) => {
      const nodeStart = nodeStarts[i];
      const nodeEnd = nodeStart + node.data.length;
      const from = Math.max(matchStart, nodeStart);
      const to = Math.min(matchEnd, nodeEnd);
      if (from >= to) return; // this node isn't part of the match
      const localFrom = from - nodeStart;
      const localTo = to - nodeStart;
      if (localTo < node.data.length) node.splitText(localTo);
      const middle = localFrom > 0 ? node.splitText(localFrom) : node;
      middle.replaceWith(makeCiteMark(middle.data, source));
    });
  }

  // -- thread bubbles ----------------------------------------------------

  function scrollThreadToEnd(): void {
    const last = thread.lastElementChild;
    last?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'end' });
  }

  function addVisitorBubble(text: string): void {
    const el = cloneTemplate(tplVisitor);
    const span = el.querySelector<HTMLElement>('.msg-text');
    if (span) span.textContent = text;
    thread.appendChild(el);
    scrollThreadToEnd();
  }

  function addThinkingBubble(): HTMLElement {
    const el = cloneTemplate(tplThinking);
    thread.appendChild(el);
    scrollThreadToEnd();
    return el;
  }

  function setPhaseLabel(thinkingEl: HTMLElement, text: string): void {
    const label = thinkingEl.querySelector<HTMLElement>('.phase-label');
    if (label) label.textContent = text;
  }

  interface AnswerBubbleRefs {
    root: HTMLElement;
    msgText: HTMLElement;
    cursor: HTMLElement | null;
    provEl: HTMLElement | null;
    provSrc: HTMLElement | null;
    flagRefused: HTMLElement | null;
    flagError: HTMLElement | null;
    retryWrap: HTMLElement | null;
  }

  function insertAnswerBubble(placeholderEl: HTMLElement): AnswerBubbleRefs {
    const root = cloneTemplate(tplAnswer);
    placeholderEl.replaceWith(root);
    scrollThreadToEnd();
    return {
      root,
      msgText: root.querySelector<HTMLElement>('.msg-text') as HTMLElement,
      cursor: root.querySelector<HTMLElement>('.cursor'),
      provEl: root.querySelector<HTMLElement>('.prov'),
      provSrc: root.querySelector<HTMLElement>('.prov .src'),
      flagRefused: root.querySelector<HTMLElement>('.flag-refused'),
      flagError: root.querySelector<HTMLElement>('.flag-error'),
      retryWrap: root.querySelector<HTMLElement>('.retry-wrap'),
    };
  }

  function finalizeSources(refs: AnswerBubbleRefs, sources: string[]): void {
    if (!refs.provEl) return;
    if (sources.length === 0) {
      refs.provEl.hidden = true;
      return;
    }
    if (refs.provSrc) refs.provSrc.textContent = sources.join(' · ');
    refs.provEl.hidden = false;
  }

  function replaceWithRefusal(thinkingEl: HTMLElement, message?: string): void {
    const refs = insertAnswerBubble(thinkingEl);
    refs.cursor?.remove();
    if (refs.provEl) refs.provEl.hidden = true;
    if (refs.flagRefused) refs.flagRefused.hidden = false;
    refs.msgText.textContent =
      message ??
      "That's outside what I can responsibly answer as htlord's digital twin — try asking about the " +
        'engineering work, the thinking behind it, or something the résumé leaves out.';
    setState('refused');
    scrollThreadToEnd();
  }

  function replaceWithError(thinkingEl: HTMLElement, message: string): void {
    const refs = insertAnswerBubble(thinkingEl);
    refs.cursor?.remove();
    if (refs.provEl) refs.provEl.hidden = true;
    if (refs.flagError) refs.flagError.hidden = false;
    refs.msgText.textContent = message;
    if (refs.retryWrap) {
      refs.retryWrap.hidden = false;
      const retryBtn = cloneTemplate(tplRetry) as HTMLButtonElement;
      retryBtn.addEventListener('click', () => {
        if (lastQuestion) void sendQuestion(lastQuestion);
      });
      refs.retryWrap.appendChild(retryBtn);
    }
    setState('error');
    scrollThreadToEnd();
  }

  async function streamMockSegments(msgText: HTMLElement, segments: AnswerSegment[], reduced: boolean): Promise<void> {
    for (const seg of segments) {
      if (seg.cite) {
        msgText.appendChild(makeCiteMark(seg.text, seg.cite));
        if (!reduced) await delay(120);
        scrollThreadToEnd();
        continue;
      }
      const words = seg.text.split(/(\s+)/).filter((w) => w.length > 0);
      for (const w of words) {
        msgText.appendChild(document.createTextNode(w));
        if (!reduced) await delay(16 + Math.random() * 24);
      }
      scrollThreadToEnd();
    }
  }

  // -- mock path (TODO(T11): replace mock with live endpoint) -----------

  async function runMock(question: string, thinkingEl: HTMLElement): Promise<void> {
    const reduced = prefersReducedMotion();
    setState('guarding');
    await delay(reduced ? 0 : 500);

    const verdict = classifyQuestion(question);

    if (verdict.kind === 'error') {
      replaceWithError(thinkingEl, 'The twin lost connection mid-thought. (mock error state — demo hook)');
      return;
    }
    if (verdict.kind === 'refused') {
      replaceWithRefusal(thinkingEl);
      return;
    }

    setPhaseLabel(thinkingEl, 'composing an answer…');
    setState('generating');
    await delay(reduced ? 0 : 250);

    const refs = insertAnswerBubble(thinkingEl);
    // Keep the (still-placeholder) provenance line hidden until the answer
    // has finished streaming — finalizeSources() reveals it with the real
    // sources (or leaves it hidden for uncited answers) below.
    if (refs.provEl) refs.provEl.hidden = true;
    await streamMockSegments(refs.msgText, verdict.answer.segments, reduced);
    refs.cursor?.remove();
    finalizeSources(refs, verdict.answer.sources);
    history.push({ role: 'assistant', content: refs.msgText.textContent ?? '' });
    setState('done');
    scrollThreadToEnd();
  }

  // Citation markers: the model tags load-bearing claims inline as
  // `[fact: <source_id>]`. Strip them from the visible answer (the ids surface
  // in the provenance line instead); `holdPartial` withholds a trailing,
  // not-yet-closed marker so it never flashes mid-stream.
  function stripFactMarkers(raw: string, holdPartial: boolean): string {
    let out = raw.replace(/\s*\[fact:\s*[^\]]*\]/gi, '');
    if (holdPartial) {
      const lastOpen = out.lastIndexOf('[');
      if (lastOpen !== -1 && out.indexOf(']', lastOpen) === -1) out = out.slice(0, lastOpen);
    }
    return out;
  }

  function extractCitedSources(raw: string): string[] {
    const re = /\[fact:\s*([^\]]+)\]/gi;
    const ids = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = re.exec(raw)) !== null) ids.add(m[1].trim());
    return [...ids];
  }

  // Inline citations (finalize only — see runLive below). The wire format
  // only marks the *end* of a cited claim (`...claim [fact: id]`), not its
  // start, so the "cited phrase" has to be inferred. Scan backward from each
  // marker for a clause boundary (sentence/comma punctuation, ASCII or CJK)
  // or a MAX_PHRASE_CHARS cap, snapping outward to a word boundary if the cap
  // is what stopped the scan. This mirrors the mock's short, specific
  // {text, cite} highlights (a stat, a count) reasonably well without ever
  // running away and highlighting a whole sentence.
  const PHRASE_BREAK_RE = /[.,;:!?、，。！？；：\n"'“”‘’「」『』()（）]/;
  const MAX_PHRASE_CHARS = 40;

  // `.`/`,` don't count as a break when they sit between two digits — a
  // decimal point or thousands separator (`~0.5s`, `10,000+`) is part of the
  // value, not a clause boundary.
  function isPhraseBreak(s: string, i: number): boolean {
    const ch = s[i];
    if (!PHRASE_BREAK_RE.test(ch)) return false;
    if ((ch === '.' || ch === ',') && /[0-9]/.test(s[i - 1] ?? '') && /[0-9]/.test(s[i + 1] ?? '')) {
      return false;
    }
    return true;
  }

  function splitTrailingPhrase(between: string): { prefix: string; phrase: string } {
    let contentEnd = between.length;
    while (contentEnd > 0 && /\s/.test(between[contentEnd - 1])) contentEnd--;
    if (contentEnd === 0) return { prefix: between, phrase: '' };

    let start = contentEnd;
    let scanned = 0;
    while (start > 0 && scanned < MAX_PHRASE_CHARS && !isPhraseBreak(between, start - 1)) {
      start--;
      scanned++;
    }
    // Hit the char cap mid-word (not a boundary char) — snap forward to the
    // next space so the phrase doesn't start mid-word.
    if (scanned === MAX_PHRASE_CHARS && start > 0 && !/\s/.test(between[start - 1])) {
      const nextSpace = between.indexOf(' ', start);
      if (nextSpace !== -1 && nextSpace < contentEnd) start = nextSpace + 1;
    }
    const phrase = between.slice(start, contentEnd).trim();
    const prefix = phrase ? between.slice(0, start) : between;
    return { prefix, phrase };
  }

  // Parses the raw (marker-inclusive) answer into the same {text, cite}[]
  // shape the mock's MOCK_ANSWERS use, so finalize can drive both through
  // the same makeCiteMark(...) path.
  function toAnswerSegments(raw: string): AnswerSegment[] {
    const markerRe = /\s*\[fact:\s*([^\]]*)\]/gi;
    const segments: AnswerSegment[] = [];
    let cursor = 0;
    let m: RegExpExecArray | null;
    while ((m = markerRe.exec(raw)) !== null) {
      const between = raw.slice(cursor, m.index);
      const id = m[1].trim();
      const { prefix, phrase } = splitTrailingPhrase(between);
      if (prefix) segments.push({ text: prefix });
      if (phrase) segments.push(id ? { text: phrase, cite: id } : { text: phrase });
      cursor = markerRe.lastIndex;
    }
    const tail = raw.slice(cursor);
    if (tail) segments.push({ text: tail });
    return segments;
  }

  // Renders the sanitized Markdown for the whole answer, then wraps each
  // cited phrase in a makeCiteMark(...) span in place. One marked.parse()
  // call over the full text keeps block structure (paragraphs/lists/fences)
  // intact, rather than parsing citation-delimited fragments independently
  // and risking half-open Markdown at each boundary.
  function renderFinalAnswer(msgText: HTMLElement, rawAnswer: string, markdownSource: string): void {
    msgText.innerHTML = renderMarkdownSubset(markdownSource);
    for (const seg of toAnswerSegments(rawAnswer)) {
      const phrase = seg.cite ? seg.text.trim() : '';
      if (phrase) wrapCitedPhrase(msgText, phrase, seg.cite as string);
    }
  }

  // -- live path ----------------------------------------------------------

  async function runLive(question: string, thinkingEl: HTMLElement): Promise<void> {
    setState('guarding');

    let resp: Response;
    try {
      resp = await fetch(ENDPOINT as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history: history.slice(-8), session_id: sessionId }),
      });
    } catch {
      replaceWithError(thinkingEl, "Couldn't reach the twin backend — check your connection and try again.");
      return;
    }

    if (!resp.ok) {
      let message = 'The twin backend rejected that request.';
      let refused = false;
      try {
        const data = (await resp.json()) as SseEventData;
        if (typeof data.message === 'string') message = data.message;
        refused = data.state === 'refused';
      } catch {
        /* use default message above */
      }
      if (refused) replaceWithRefusal(thinkingEl, message);
      else replaceWithError(thinkingEl, message);
      return;
    }

    const reader = resp.body?.getReader();
    if (!reader) {
      replaceWithError(thinkingEl, 'Streaming is not supported in this browser.');
      return;
    }

    // Swap the thinking indicator for the real answer bubble as soon as the
    // stream opens, rather than lazily on first token — simpler state
    // machine (guarding ends when the stream opens; generating covers the
    // whole read loop) and avoids holding a nullable reference that a
    // closure would need to reassign.
    setPhaseLabel(thinkingEl, 'composing an answer…');
    setState('generating');
    const refs = insertAnswerBubble(thinkingEl);
    // Keep the provenance line hidden while streaming; finalizeSources() reveals
    // it at the end with the fact ids the answer actually cited.
    if (refs.provEl) refs.provEl.hidden = true;

    const decoder = new TextDecoder();
    let buffer = '';
    let rawAnswer = '';
    let streamError: string | null = null;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let sep: number;
      while ((sep = buffer.indexOf('\n\n')) !== -1) {
        const raw = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        const evt = parseSseEvent(raw);
        if (!evt) continue;

        if (evt.event === 'token' && typeof evt.data.token === 'string') {
          rawAnswer += evt.data.token;
          // Re-render the whole answer-so-far every token: cheap at
          // chat-answer length, and it's what makes half-open Markdown (an
          // unclosed `**`, an unclosed fence) tolerable — marked just prints
          // the stray `*`/backtick literally instead of leaving broken markup
          // on screen. No citation marks mid-stream (see renderFinalAnswer,
          // called once on finalize below); holdPartial above keeps a
          // trailing `[fact: <partial...` from ever flashing either.
          refs.msgText.innerHTML = renderMarkdownSubset(stripFactMarkers(rawAnswer, true));
          scrollThreadToEnd();
        } else if (evt.event === 'error') {
          streamError = (typeof evt.data.message === 'string' && evt.data.message) ||
            'The answer stream failed. Please try again.';
        }
        // 'state' and 'done' need no handling here: this function reflects both
        // by construction (guarding→generating above, done below the read loop).
      }
    }

    refs.cursor?.remove();

    const finalText = stripFactMarkers(rawAnswer, false).trim();

    if (streamError) {
      // Surface the error (keeping any partial answer) with a retry affordance.
      refs.msgText.textContent = finalText.length > 0 ? finalText : streamError;
      if (refs.provEl) refs.provEl.hidden = true;
      if (refs.flagError) refs.flagError.hidden = false;
      if (refs.retryWrap) {
        refs.retryWrap.hidden = false;
        const retryBtn = cloneTemplate(tplRetry) as HTMLButtonElement;
        retryBtn.addEventListener('click', () => {
          if (lastQuestion) void sendQuestion(lastQuestion);
        });
        refs.retryWrap.appendChild(retryBtn);
      }
      if (finalText.length > 0) history.push({ role: 'assistant', content: finalText });
      setState('error');
      scrollThreadToEnd();
      return;
    }

    if (finalText.length > 0) {
      renderFinalAnswer(refs.msgText, rawAnswer, finalText);
    } else {
      refs.msgText.textContent = 'The twin stream ended without saying anything — try rephrasing the question.';
    }
    finalizeSources(refs, extractCitedSources(rawAnswer));
    history.push({ role: 'assistant', content: refs.msgText.textContent ?? '' });
    setState('done');
    scrollThreadToEnd();
  }

  // -- orchestration --------------------------------------------------

  function setComposerBusy(isBusy: boolean): void {
    chips.classList.toggle('busy', isBusy);
    composerWrap.classList.toggle('busy', isBusy);
    input.disabled = isBusy;
    sendBtn.disabled = isBusy;
  }

  async function sendQuestion(question: string): Promise<void> {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    busy = true;
    setComposerBusy(true);

    addVisitorBubble(trimmed);
    history.push({ role: 'user', content: trimmed });
    lastQuestion = trimmed;

    const thinkingEl = addThinkingBubble();
    setPhaseLabel(thinkingEl, 'reviewing the question…');

    try {
      if (ENDPOINT) {
        // Live path (wired): streams from the deployed digital-twin-chat Edge
        // Function. Active once PUBLIC_TWIN_ENDPOINT is set at build time.
        await runLive(trimmed, thinkingEl);
      } else {
        // Build-time fallback when PUBLIC_TWIN_ENDPOINT is unset (e.g. the
        // public GitHub Pages build with no backend URL): a canned, honest mock.
        await runMock(trimmed, thinkingEl);
      }
    } catch (err) {
      console.error('[digital-twin] unexpected failure', err);
      replaceWithError(thinkingEl, 'Something went wrong reaching the twin.');
    } finally {
      busy = false;
      setComposerBusy(false);
      setState('idle');
    }
  }

  // -- wiring -----------------------------------------------------------

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    void sendQuestion(value);
  });

  chips.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest<HTMLButtonElement>('button.chip');
    if (!btn) return;
    const question = btn.textContent?.trim();
    if (!question) return;
    btn.classList.add('on');
    btn.setAttribute('aria-pressed', 'true');
    void sendQuestion(question);
  });

  // Bilingual starter chips: default markup is English, swapped to the
  // Chinese variant when the browser's language preference is Chinese.
  const isZh = (navigator.language || '').toLowerCase().startsWith('zh');
  if (isZh) {
    chips.querySelectorAll<HTMLElement>('.chip-wrap').forEach((wrap) => {
      const btn = wrap.querySelector<HTMLButtonElement>('button.chip');
      const zhText = wrap.dataset.zh;
      if (btn && zhText) btn.textContent = zhText;
    });
  }

  setState('idle');
}

init();

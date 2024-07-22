---
title: Conventional Commits
pubDate: '2024-07-22'
tags:
  - git
  - team
---


Abstract
---
In scenario, your teams need you to review code from other memebers. You want to briefly understand what is the issue want to archieve and the mind set of it. This commit style make it emerge from the comment. Not only that, a clerified commits can help you know what exact things and steps you need for archieving your goal. It's not only increase progression on reviewing others' code, but also lead you to program a correct path to reach you developing goal.


How
---
It's simple. Just add `Conventional Commits specification` on your comment. Make others and yourself to know what exactly you want to do or archieve.

```bash
# SYNTAX
# <type>[options]: <one-thing-one-commit-and-description-as-clean-as-possible>

# Examples
feat(appointment): add sql migration for color tag record
ci: modify os version of building docker image
chores: update guava library from v33.2.0 to v33.2.1
fix: null exception from callNotification:254

# Scenario

```
const cardList = [
    'MacOS',
    'Linux',
    'Windows',
    'Golang',
    'JavaScript',
    'Java',
    'Python',
    'Kubernetes',
    'Docker',
    'Git',
];

function mouseEnterCardHandler(e) {
    anime({
        targets: e.target,
        translateY: -10,
        easing: 'easeInOutSine',
        duration: 500
    });
};

function mouseLeaveCardHandler(e) {
    anime({
        targets: e.target,
        translateY: 10,
        easing: 'easeInOutSine'
    });
};

cardList.forEach(id => {
    document.getElementById(id).addEventListener('mouseenter', (e) => mouseEnterCardHandler(e));
    document.getElementById(id).addEventListener('mouseleave', (e) => mouseLeaveCardHandler(e));
});

function scrollToTop() {
    const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;
    anime({
        targets: scrollElement,
        scrollTop: 0,
        duration: 500,
        easing: 'easeInOutQuad'
    });
}
export function disableScroll() {
    // two scrollbars because scrollbar-gutter variable is set to both-edges
    const scrollBars = window.innerWidth - document.documentElement.offsetWidth;

    // disabling scrollbar-gutter prevents white space appearance on edges
    // when modal window is visible.. in its turn this causes content's
    // shift so we also need to add paddings to both sides to prevent it..
    // this is how the scrollbar-gutter actually works with full-width
    // elements at present and this CSS hack fixes the conflict
    document.documentElement.style.cssText = `
        --body-padding: 0 ${scrollBars / 2}px;
        --body-overflow: hidden;
        scrollbar-gutter: unset;
    `;
}

export function enableScroll() {
    setTimeout(() => {
        document.documentElement.removeAttribute('style');
    }, 100);
}
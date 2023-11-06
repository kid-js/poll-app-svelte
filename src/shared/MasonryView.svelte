<script>
    import { onMount, onDestroy } from 'svelte';
    import { debounce } from '../helpers';

    export let breaks = { 1024: 1 };
    export let columns = 2;
    export let gap = 28;
    export let isSingleStretched = true;
    export let selector;

    let container;
    let containerNodes;
    let mutationObserver;
    let resizeObserver;

    function setNodesCoords() {
        setColumnsNumber();

        const columnsHeights = new Array(columns).fill(0);
        const lastChildTops = new Array(columns).fill(0);

        const containerWidth = container.getBoundingClientRect().width;
        const margin = gap * (columns - 1) / columns;
        const width = containerWidth / columns - margin;

        [...container.children].map((child, i) => {
            const columnIndex = i % columns;

            const height = child.getBoundingClientRect().height;
            const left = columnIndex * width + columnIndex * gap;
            const top = lastChildTops[columnIndex];

            columnsHeights[columnIndex] += height + gap;
            lastChildTops[columnIndex] += height + gap;

            child.style.top = `${top}px`;
            child.style.left = `${left}px`;
            child.style.width = `calc(${100 / columns}% - ${margin}px)`;
        });

        const maxHeight = Math.max(...columnsHeights);

        container.style.height = `${maxHeight - gap}px`;
    }

    function setColumnsNumber() {
        if (isSingleStretched) {
            if (container.children.length < 2) {
                columns = 1;
                return;
            }
        }

        for (const breakpoint in breaks) {
            const columnsNum = breaks[breakpoint];

            if (window.innerWidth < breakpoint) {
                columns = columnsNum;
                break;
            } else {
                columns = columnsNum + 1;
            }
        }
    }

    onMount(() => {
        container = document.querySelector(selector);
        containerNodes = [...container.children];

        const updateNodesCoords = debounce(setNodesCoords, 155);

        const resizeCallback = () => updateNodesCoords();

        const mutationCallback = (entries) => {
            entries.forEach(el => {
                if (el.type === 'childList') {
                    setNodesCoords();
                }
            });
        };

        setNodesCoords();

        mutationObserver = new MutationObserver(mutationCallback);
        resizeObserver = new ResizeObserver(resizeCallback);

        mutationObserver.observe(container, { childList: true });
        containerNodes.forEach(node => resizeObserver.observe(node));
    });

    onDestroy(() => {
        mutationObserver.disconnect();
        resizeObserver.disconnect();
    });
</script>

<slot></slot>
<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let tabs = [];
    export let activeTab = '';

    function onTabClick(tab = '') {
        dispatch('tabSwitch', { tab });
    }

    function onTabKeydown(e, tab = '') {
        if (e.key === 'Enter') {
            dispatch('tabSwitch', { tab });
        }
    }
</script>

<nav class="tabs">
    <ul class="tabs-list">
        {#each tabs as tab}
            <li
                class="tab"
                class:active={tab === activeTab}
                role="tab"
                tabindex="0"
                on:click={() => onTabClick(tab)}
                on:keydown={(e) => onTabKeydown(e, tab)}
            >
                {tab}
                <span class="border-bottom"></span>
            </li>
        {/each}
    </ul>
</nav>

<style>
    .tabs {
        margin-top: 32px;
    }

    .tabs-list {
        display: flex;
        gap: 16px;
    }

    .tab {
        text-align: center;
        padding: 6px 12px 8px;
        border-radius: 2px 2px 0 0;

        cursor: pointer;
        user-select: none;
        position: relative;
        transition: all 0.15s ease;
    }

    .active,
    .tab:hover {
        background-color: rgba(10, 207, 197, 0.06);
    }

    .border-bottom {
        display: block;
        width: 0%;
        height: 3px;
        background-color: rgba(10, 207, 197, 0.85);

        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }

    .active > .border-bottom {
        width: 100%;
        animation: border-bottom 0.15s ease-out;
    }

    @keyframes border-bottom {
        from {
            width: 0%;
        }
        to {
            width: 100%;
        }
    }
</style>
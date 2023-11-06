<script>
    import { fade } from 'svelte/transition';

    import MasonryView from '../shared/MasonryView.svelte';
    import PollDetails from './PollDetails.svelte';

    export let polls = [];
</script>

<MasonryView selector={'.poll-list'}>
    <section class="poll-list" >

        {#each $polls as poll (poll.id)}
            <div class="poll" out:fade={{ duration: 165 }}>
                <PollDetails {poll} on:vote on:delete />
            </div>
        {:else}
            <p class="empty-list">
                There is no polls yet
            </p>
        {/each}

    </section>
</MasonryView>

<style>
    .poll-list {
        width: 100%;
        margin-top: 32px;
        transition: ease-out 0.195s;
        position: relative;
    }

    .poll {
        width: 100%;
        padding: 12px;
        border-radius: 2px;

        background-color: rgba(10, 207, 197, 0.125);
        transition: ease-out 0.195s;
        position: absolute;
    }

    .empty-list {
        text-align: center;
        width: 100% !important; /* prevent paragraph twitching */
    }

    @media screen and (min-width: 1024px) {
        /* prevent unwanted transitions on component load */
        .poll {
            width: calc(50% - 14px);
        }
    }
</style>
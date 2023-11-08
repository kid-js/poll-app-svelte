<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { optionsTags } from '../config/config';

    import Button from '../shared/Button.svelte';

    export let poll;

    const dispatch = createEventDispatcher();

    const pollOptions = optionsTags.slice(0, poll.optionsNum);

    const percentage = {};
    const tweenedMotions = {};
    const unsubs = {};

    $: totalVotes = pollOptions.reduce((acc, option) => {
        return acc + poll['votes' + option];
    }, 0);

    $: updatePercentage(totalVotes);

    initTweenedMotions();

    function initTweenedMotions() {
        pollOptions.forEach(option => {
            tweenedMotions[option] = tweened(0, { duration: 255 });

            unsubs[option] = tweenedMotions[option].subscribe(value => {
                percentage[option] = value;
            });
        });
    }

    function onDeleteIconClick(poll = {}) {
        dispatch('delete', { poll });
    }

    function onVote(option = '', id) {
        dispatch('vote', { option, id });
    }

    function onKeypress(e, option = '', id) {
        if (e.key === 'Enter') {
            dispatch('vote', { option, id });
        }
    }

    function getPercentage(votes = 0) {
        return votes ? (votes * 100 / totalVotes) : 0;
    }

    function updatePercentage() {
        for (const option in tweenedMotions) {
            tweenedMotions[option].set(getPercentage(poll['votes' + option]));
        }
    }

    onDestroy(() => {
        for (const unsub in unsubs) {
            unsubs[unsub]();
        }
    });
</script>

<h3 class="poll-title">
    {poll.question}
</h3>

<p class="total-votes">
    Total votes:
    <span class="total-votes__count">
        {totalVotes}
    </span>

    <Button
        type={'button'}
        style={'icon icon_delete-poll'}
        on:click={() => onDeleteIconClick(poll)}
    >
        <img
            src="images/delete-icon.svg"
            alt="Delete Poll"
            title="Delete Poll"
            width="24px"
            height="24px"
        >
    </Button>
</p>

{#each pollOptions as option}
    <div
        class="answer-body"
        role="button"
        tabindex="0"
        on:keydown={(e) => onKeypress(e, option, poll.id)}
        on:click={() => onVote(option, poll.id)}
    >
        <div class="percent" style="width: {percentage[option]}%"></div>

        <div class="answer">
            <span class="answer__text">
                {poll['answer' + option]}

                <span class="answer__votes">
                    - {poll['votes' + option]}
                </span>
            </span>

            <span class="answer__percentage">
                {percentage[option].toFixed(1)}%
            </span>
        </div>
    </div>
{/each}

<style>
    .poll-title,
    .answer__text {
        overflow-wrap: break-word;
    }

    .poll-title {
        text-align: center;
        color: #555;
        font-size: 22px;
    }

    .total-votes {
        text-align: center;
        color: #969696;
        font-size: 16px;
        margin: 8px 0 16px;
        position: relative;
    }

    .total-votes__count {
        display: inline-block;
        text-align: center;
        min-width: 24px;
    }

    .answer-body {
        margin: 10px auto 0;
        border-radius: 2px;
        background: rgba(250, 250, 250, 1);

        cursor: pointer;
        user-select: none;
        position: relative;
    }

    .answer-body:hover{
        background: rgba(255, 255, 255, 0.475);
    }

    .answer-body:hover > .percent {
        background-color: rgba(10, 207, 197, 0.35);
    }

    .answer-body:active {
        background: rgba(255, 255, 255, 0.735);
    }

    .answer-body:active > .percent {
        background-color: rgba(10, 207, 197, 0.45);
    }

    .percent {
        border-radius: 2px;
        background-color: rgba(10, 207, 197, 0.315);

        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }

    .answer {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        padding: 8px 12px;
        position: relative;
    }

    .answer__text {
        font-weight: 500;
        min-width: 8px; /* to make overflow-wrap working with flex */
    }

    .answer__votes {
        font-size: 16px;
        font-weight: 300;
    }

    .answer__percentage {
        text-align: right;
        min-width: 56px;
        margin-left: 16px;
    }
</style>
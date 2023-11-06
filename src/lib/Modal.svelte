<script>
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    const animationOpts = {
        duration: 88,
        easing: cubicOut,
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" transition:fade={ animationOpts } on:click></div>

<div class="confirm-modal" transition:fade={ animationOpts }>
    <slot name="modal-title"></slot>
    <slot name="modal-subtitle"></slot>
    <slot name="control-buttons"></slot>
</div>

<style>
    .modal-overlay {
        background-color: rgb(0, 0, 0, 0.5);
        position: fixed;
        inset: 0;
    }

    .confirm-modal {
        text-align: right;
        width: 100%;
        padding: 20px 24px;
        border-radius: 2px;
        background-color: whitesmoke;

        position: fixed;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-65%);
    }

    @media screen and (min-width: 416px) {
        .confirm-modal {
            width: auto;
            min-width: 416px;
            left: 50%;
            right: auto;
            transform: translate(-50%, -65%);
        }
    }
</style>
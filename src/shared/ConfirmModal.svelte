<script>
    import {
        createEventDispatcher,
        onDestroy,
        onMount,
    } from 'svelte';

    import Modal from '../lib/Modal.svelte';
    import Button from './Button.svelte';

    export let title = 'Do you confirm this action?';
    export let subtitle = 'This action cannot be undone!';
    export let strongTitle = '';
    export let cancelTitle = 'Cancel';
    export let confirmTitle = 'Confirm';

    const dispatch = createEventDispatcher();

    function onCancel() {
        dispatch('cancel');
    }

    function onConfirm() {
        dispatch('confirm');
    }

    function onKeydown(e) {
        if (e.key === 'Escape') {
            dispatch('cancel');
        }
    }

    onMount(() => {
        document.addEventListener('keydown', onKeydown);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', onKeydown);
    });
</script>

<Modal on:click>
    <p class="title" slot="modal-title">
        {title}
        <span class="title_strong">
            {strongTitle}
        </span>
    </p>

    <p class="subtitle" slot="modal-subtitle">
        {subtitle}
    </p>

    <div class="control-buttons" slot="control-buttons">
        <Button style={'primary light'} on:click={onCancel}>
            {cancelTitle}
        </Button>

        <Button style={'grey light'} margin={'0 0 0 8px'} on:click={onConfirm}>
            {confirmTitle}
        </Button>
    </div>
</Modal>

<style>
    .title_strong {
        font-weight: 500;
        overflow-wrap: break-word;
    }

    .subtitle {
        font-size: 18px;
        font-weight: 300;
        margin-top: 8px;
    }

    .control-buttons {
        margin-top: 20px;
    }
</style>
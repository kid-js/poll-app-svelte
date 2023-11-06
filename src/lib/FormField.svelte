<script>
    import Button from '../shared/Button.svelte';

    export let field;
    export let label;
    export let formInputs;
    export let currentErrors;
    export let canBeRemoved;
</script>

<div class="form-field">
    <input
        type="text"
        class="input-field"
        placeholder=""
        maxlength="{field === 'question' ? '60' : '36'}"
        id="{field}"
        bind:value={formInputs[field]}
        on:change
    />

    <label
        class="input-label"
        class:error={currentErrors[field]}
        for="{field}"
    >
        {label} {currentErrors[field] || ''}
    </label>

    {#if canBeRemoved}
        <Button type={'button'} style={'icon icon_delete-field'} on:click>
            <img src="images/close-icon.svg" alt="Delete Field">
        </Button>
    {/if}
</div>

<style>
    .form-field {
        display: flex;
        padding-top: 40px;
        position: relative;
    }

    .form-field:last-of-type {
        margin-bottom: 40px;
    }

    .input-label {
        color: #8597a3;
        position: absolute;
        top: 40px;
        transition: 0.15s ease;
    }

    .input-field {
        color: inherit;
        width: 100%;
        padding: 4px 32px 4px 0;

        border: 0;
        border-bottom: 2px solid #eee;
        background-color: transparent;
    }

    .input-field:focus,
    .input-field:not(:placeholder-shown) {
        border-bottom-color: #0acfc5;
        outline: 0;
    }

    .input-field:focus + .input-label,
    .input-field + .input-label.error,
    .input-field:not(:placeholder-shown) + .input-label {
        color: #8597a3e0;
        transform: scale(0.8) translateY(-24px);
        transform-origin: top left;
        white-space: nowrap;
    }

    .input-field + .input-label.error {
        color: #ca2020;
    }
</style>
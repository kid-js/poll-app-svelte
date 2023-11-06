<script>
    export let style = 'primary';
    export let type = 'submit';
    export let margin = '0';
</script>

<button {type} class="button {style}" style="--margin:{margin}" on:click>
    <slot></slot>
</button>

<style>
    .button {
        color: #fff;
        font-weight: 500;

        margin: var(--margin);
        padding: 8px 12px;
        border: 0;
        border-radius: 2px;

        cursor: pointer;
        transition: all 0.15s ease;
    }

    .primary,
    .primary:hover:active {
        background-color: #09cac1;
    }

    .primary:hover {
        background-color: #00c0b6;
    }

    .grey,
    .grey:hover:active {
        background-color: #818181;
    }

    .grey:hover {
        background-color: #797979;
    }

    .light {
        font-size: 19px;
        font-weight: 400;
    }

    .icon {
        width: 24px;
        height: 24px;
        padding: 0;
        background-color: transparent;
        opacity: 0.355;
    }

    .icon:hover,
    .icon:hover:active {
        background-color: transparent;
        opacity: 0.695;
    }

    .icon_delete-field {
        position: absolute;
        right: 4px;
        bottom: 10%;
    }

    .icon_delete-poll {
        position: absolute;
        right: 0;
        bottom: 2px;
    }
</style>
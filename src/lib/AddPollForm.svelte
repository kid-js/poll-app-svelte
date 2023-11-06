<script>
    import { nanoid } from 'nanoid';
    import { createEventDispatcher, tick } from 'svelte';

    import { getDefaultBlankData, getInitialPollVotes } from '../helpers';
    import { formData } from '../stores/stores';
    import {
        defaultFieldsNum,
        formFields,
        optionsTags,
    } from '../config/config';

    import FormField from './FormField.svelte';
    import Button from '../shared/Button.svelte';

    const dispatch = createEventDispatcher();

    let currentErrors = {};
    let fieldsNum = $formData.fieldsNum;
    const formInputs = { ...$formData.formInputs };

    let isFormValid = false;

    $: optionsNum = fieldsNum - 1; // -1 to exclude question field
    $: actualFormFields = formFields.slice(0, fieldsNum);

    function onInputChange(e) {
        const input = e.target;

        formInputs[input.id] = input.value.trim();

        saveFormSnapshot();
    }

    function onFormSubmit() {
        validateForm();

        if (isFormValid) {
            const poll = createPoll();

            formData.set({
                fieldsNum: defaultFieldsNum,
                formInputs: getDefaultBlankData(),
            });

            dispatch('formSubmit', { poll });
        }
    }

    function onAddFieldButtonClick() {
        fieldsNum++;

        addNewFieldToForm();
        saveFormSnapshot();
    }

    function onRemoveFieldButtonClick() {
        fieldsNum--;

        removeFieldFromForm();
        saveFormSnapshot();
    }

    function validateForm() {
        currentErrors = getDefaultBlankData(fieldsNum);

        isFormValid = true;

        const validateField = (input = '', length = 1, message = '') => {

            if (formInputs[input].length < length) {
                isFormValid = false;
                currentErrors[input] = message;
            }
        };

        actualFormFields.forEach(({ field, minLength, errorMsg }) => {
            validateField(field, minLength, errorMsg);
        });
    }

    function createPoll() {
        return {
            optionsNum,
            ...formInputs,
            ...getInitialPollVotes(optionsNum),
            id: nanoid(),
        };
    }

    function saveFormSnapshot() {
        formData.set({
            fieldsNum,
            formInputs,
        });
    }

    async function addNewFieldToForm() {
        await tick(); // wait until last input value is saved before rerender

        formInputs['answer' + optionsTags[optionsNum - 1]] = '';
    }

    function removeFieldFromForm() {
        delete formInputs[actualFormFields.at(-1).field];
    }
</script>

<section class="form-section">
    <form class="form" on:submit|preventDefault={onFormSubmit}>

        {#each actualFormFields as { field, label }, i (field)}
            <FormField
                {field} {label} {formInputs} {currentErrors}
                canBeRemoved={
                    actualFormFields.length > 3
                    && i === actualFormFields.length - 1
                }
                on:change={onInputChange}
                on:click={onRemoveFieldButtonClick}
            />
        {/each}

        {#if fieldsNum < formFields.length}
            <Button
                type={'button'}
                style={'primary light'}
                on:click={onAddFieldButtonClick}
            >
                Add Option
                <span class="options-count">
                    · {formFields.length - actualFormFields.length} more left
                </span>
            </Button>
        {/if}

        <Button style={'primary'} margin={'12px 0 0'}>
            Create New Poll
        </Button>
    </form>
</section>

<style>
    .form-section {
        width: 100%;
        max-width: 800px;
        margin-top: 4px;
        padding: 0 8px;
    }

    .form {
        display: flex;
        flex-direction: column;
    }

    .options-count {
        font-size: 16px;
        font-weight: 300;
    }
</style>
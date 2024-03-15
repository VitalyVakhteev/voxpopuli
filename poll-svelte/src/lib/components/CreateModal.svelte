<script>
    import '$lib/assets/global.css';
    import axios from 'axios';
    import { apiURL } from '$lib/Store';
    let options = ['', ''];
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let pollDescription = '';
    let selectedDate = '';
    export let showModal; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();

    function addOption() {
        if (options.length < 10) {
            options = [...options, ''];
        }
    }

    function removeOption(index) {
        options = options.filter((_, i) => i !== index);
    }

    function updateOption(index, value) {
        options[index] = value;
    }

    async function handleSubmit() {
        const pollTitle = document.querySelector('.poll-title').value;
        if (!pollTitle || options.some(option => option.trim() === '')) {
            console.error('Please fill all fields.');
            return;
        }

        try {
            const newPoll = {
                name: pollTitle,
                description: pollDescription,
                startTime: new Date().toISOString(),
                endTime: new Date(selectedDate).toISOString(),
                options: options.map(option => ({description: option}))
            };
            const response = await axios.post(`${apiURL}/polls`, newPoll);
            dispatch('submitted', {
                reload: true
            })
            dialog.close();
        } catch (error) {
            console.error('Error creating poll:', error);
            throw error;
        }
    }
</script>

<style>
    .main-cont {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        background-color: var(--cont-background);
        margin: 0 auto;
        width: 450px;
        border-radius: 8px;
    }

    .option-input {
        display: flex;
        gap: 10px;
        align-items: center;
        background-color: var(--option-color);
        border: 4px var(--secondary) solid;
        border-radius: 3px;
        color: var(--text);
        margin-bottom: 20px;
    }

    .option-input button {
        background: none;
        outline: none;
        border: none;
        margin: auto;
    }

    .option-input input {
        background: none;
        outline: none;
        border: none;
        padding: 5px 0 5px 10px;
    }

    .poll-title {
        background: none;
        outline: none;
        border: none;
        width: 350px;
        font-size: 20px;
        display: flex;
        align-items: center;
        background-color: var(--accent);
        border: 5px var(--primary) solid;
        border-radius: 3px;
        color: var(--text);
        padding: 5px 0 5px 10px;
        margin-bottom: 25px;
    }

    .poll-description{
        background: none;
        outline: none;
        border: none;
        width: 350px;
        font-size: 20px;
        display: flex;
        align-items: center;
        background-color: var(--accent);
        border: 5px var(--primary) solid;
        border-radius: 3px;
        color: var(--text);
        padding: 5px 0 5px 10px;
        margin-bottom: 50px;
    }

    .add-option-button {
        background: var(--option-color);
        border: 4px var(--secondary) solid;
    }

    .submit-button {
        float: right;
        background-color: var(--submit-button);
        border: 4px darkgreen solid;
    }

    .add-option-button, .submit-button, .cancel-button {
        border-radius: 3px;
        padding: 5px 10px;
        margin-bottom: 40px;
    }

    .add-option-button:disabled {
        background: grey;
        border-color: none;
        cursor: not-allowed;
    }


    .cancel-button {
        color: var(--text);
        float: right;
        background-color: red;
        border: 4px rgb(253, 131, 131) solid;
        text-align: center;
        margin: 0 auto;
        height: fit-content;
    }

    .main-buttons-parent {
        display: flex;

        place-content: center;
    }

    button {
        cursor: pointer;
    }


    dialog {
        /*max-width: 200px;*/
        border-radius: 5px;
        border: none;
        padding: 0;
        background: transparent;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }


    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.85);
        }
        to {
            transform: scale(1);
        }
    }

    dialog[open]::backdrop {
        animation: fade 0.15s ease-out;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    button {
        display: block;
    }
</style>
<dialog
        bind:this={dialog}
        on:click|self={() => dialog.close()}
        on:close={() => (showModal = false)}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->

    <div class="main-cont" on:click|stopPropagation>
        <h1 style="text-align: center; font-weight: bold;">Create Poll</h1>
        <form on:submit|preventDefault={handleSubmit}>
            <input class="poll-title" placeholder="Poll Title" type="text">
            <input class="poll-description" placeholder="Poll Description" type="text" bind:value={pollDescription}>
            <input type="date" id="datepicker" bind:value={selectedDate}>
            {#each options as option, index (index)}
                <div class="option-input">
                    <input type="text" placeholder={`Option ${index + 1}`} bind:value={options[index]}
                           on:input={e => updateOption(index, e.target.value)}/>
                    <button type="button" on:click={() => removeOption(index)}>Remove</button>
                </div>
            {/each}
            <div class="main-buttons-parent">
                <button class="add-option-button" disabled={options.length >= 10} on:click={addOption}
                        type="button">Add Option
                </button>
                <button class="cancel-button" on:click={() => dialog.close()}>
                    Cancel
                </button>
                <button class="submit-button" on:click={handleSubmit} type="button">Submit</button>
            </div>

        </form>
    </div>

</dialog>
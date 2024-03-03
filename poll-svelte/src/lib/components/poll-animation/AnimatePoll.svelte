<script>
    import { onMount } from 'svelte';
    import axios from "axios";
    import Bar from "./bar.svelte";
    import { currentPoll, currentID } from "$lib/Store.js";

    const apiURL = 'https://voxpopuli.lol/api'; // Change this for deployment

    let pollPromise;
    let visible = false;

    onMount(() => {

        pollPromise = fetchPoll($currentID);

    });

    async function fetchPoll(id) {
        try {
            const response = await axios.get(`${apiURL}/polls/${id}`);
            const poll = response.data;
            console.log(poll.options)
            currentPoll.set(poll);
            visible = true;
            return poll; // Return the poll data to be used with the `await` block
        } catch (error) {
            console.error(error);
            // Handle error, e.g., by setting an error state or message
            throw error; // Re-throw error to be caught by the `await` block's error handling
        }
    }
</script>

{#if visible}
    {#await pollPromise then poll}
        <div class="animate-poll-cont">
            {#each poll.options as data}
                <!-- Assuming `Bar` component expects `value` and `description` props -->
                <Bar value={data.votes.length()} description={data.description}/>
            {/each}
        </div>
    {:catch error}
        <!-- Error handling UI here -->
        <p>Error loading poll data.</p>
    {/await}
{/if}

<script>
    import {onDestroy, onMount} from 'svelte';
    import axios from 'axios';

    import { goto } from '$app/navigation';

    import {currentID, currentPoll, currentUsername, hasVoted} from "$lib/Store.js";

    let poll;
    let comments = [];
    let newComment = '';
    let errorMessage = '';

    let username = $currentUsername;
    let id;
    const apiURL = 'https://voxpopuli.lol/api'; // Change this for deployment

    export let data;


    function fetchData() {
        if (data && data.slug) {
            id = data.slug;
            currentID.set(id);
            axios.get(`${apiURL}/polls/${id}`)
                .then(response => {
                    poll = response.data;
                    console.log(poll)
                    currentPoll.set(poll)
                })
                .catch(error => {
                    console.error(error);
                    errorMessage = "Error loading poll.";
                });

            axios.get(`${apiURL}/polls/${id}/comments`)
                .then(response => {
                    comments = response.data;
                })
                .catch(error => {
                    console.error(error);
                    errorMessage = "Error loading comments.";
                });
        } else {
            errorMessage = "Poll ID not provided.";
        }
    }

    async function vote(optionId) {
        console.log(optionId);
        if (!username) {

            errorMessage = "You must be logged in to vote.";
            await goto('/login')
            return;
        }

        try {
            await axios.post(`${apiURL}/polls/options/${optionId}/vote?username=${username}`);
            hasVoted.set(true);
            await fetchData();
        } catch (error) {
            console.error(error);
            errorMessage = "You have already voted in this poll.";
        }
    }

    async function submitComment() {
        if (!username || !newComment.trim()) {
            errorMessage = "You must be logged in and comment cannot be empty.";
            return;
        }

        try {
            await axios.post(`${apiURL}/polls/${id}/comments`, {username, text: newComment});
            newComment = '';
            await fetchData();
        } catch (error) {
            console.error(error);
            errorMessage = "Error submitting comment.";
        }
    }

    function hasEndTimePassed(endTime) {
        return new Date(endTime).getTime() < new Date().getTime();
    }

    onMount(fetchData);
    onDestroy(() => {
        poll = null;
        comments = [];
        newComment = '';
        errorMessage = '';
    });
</script>

<style>
    .poll-main {

        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        /*width: 70%;*/

    }


    .poll-show {

    }

    .vote-cont {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
    }

    .vote-btn {
        height: 35px;
        background-color: var(--primary);
        outline: none;
        border: 0;
        border-radius: 8px;
    }

    .vote-btn:hover{
        cursor: pointer;
    }

    .submit-btn {
        height: 35px;
        background-color: var(--primary);
        outline: none;
        border: 0;
        border-radius: 8px;
    }

    .input {
        resize: none;
        background-color: var(--cont-background);
        height: 35px; /* You might need to adjust this based on your design */
        text-align: center;
        /* New properties for vertical centering */
        padding-top: 0;
        padding-bottom: 0;
        line-height: 35px; /* Match the height of the textarea to center the text vertically */
        border: 1px solid #ccc; /* Optional: adds a border to the textarea */
        border-radius: 4px; /* Optional: rounds the corners of the textarea */
    }

    .input-cont {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }

    .upper-cont{
        height: 35px;
        width: 100%;
        display: flex;
        align-items: center;

    }

    .home-btn{
        height: 35px;
        background-color: var(--primary);
        outline: none;
        border: 0;
        border-radius: 8px;
        margin-left: 20px;
    }

    .home-btn:hover{
        cursor: pointer;
    }
</style>

<div class="poll-main">
    <div class="upper-cont">
        <button class="home-btn" on:click={() => goto('/')}>Go Home</button>
    </div>
    <div class="poll-show">
        {#if poll}
            <h1>{poll.name}</h1>
            <p>Description: {poll.description}</p>
            <br>
            <p>Started on: {new Date(poll.startTime).toLocaleString() + " GMT"}</p>
            <p>Ends on: {new Date(poll.endTime).toLocaleString() + " GMT"}</p>
            <br>
            <br>
            <div>
                {#each poll.options as option}
                    <div key={option.id} class="vote-cont">
                        <button class="vote-btn" on:click={() => vote(option.id)}>
                            Vote
                        </button>
                        <p>{option.description} - Votes: {option.votes.length}</p>

                    </div>
                {/each}
            </div>
            <br>
            <div class="comments-section">
                <h3>Comments</h3>
                {#each comments as comment}
                    <div style="margin-bottom: 10px;">
                        <strong>{comment.username}: </strong>{comment.text}
                    </div>
                {/each}
                <div class="input-cont">
                    <textarea class="input" bind:value={newComment} placeholder="Add a comment..."></textarea>

                    <button class="submit-btn" on:click={submitComment}>Submit</button>
                </div>
            </div>
        {:else}
            <div>Loading...</div>
        {/if}
        {#if errorMessage}
            <p style="color: red;">{errorMessage}</p>
        {/if}
    </div>

</div>
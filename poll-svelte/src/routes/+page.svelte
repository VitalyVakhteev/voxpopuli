<script>
    import '../lib/assets/global.css'
    import axios from 'axios';
    import CreateModal from "../lib/components/CreateModal.svelte";
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import {showModal} from "../lib/Store";
    import { apiURL } from "../lib/Store";

    let currentPage = 1;
    let pageSize = 5;
    let totalPages = 0;
    let polls = writable([]);

    function myEventHandler(e) {
        fetchPolls();
    }

    export async function fetchPolls(page = currentPage, size = pageSize) {
        try {
            const response = await axios.get(`${apiURL}/polls?page=${page - 1}&size=${size}`);
            polls.set(response.data.content);
            totalPages = response.data.totalPages;
            currentPage = response.data.number + 1;
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            fetchPolls(currentPage + 1);
        }
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            fetchPolls(currentPage - 1);
        }
    }

    onMount(async () => {
        try {
           await fetchPolls();
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    });
</script>
<style>
    .main-cont {
        /*flex: 1;*/
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }


    .poll-container {
        width: 100%;
        /*flex: 1;*/
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
    }

    .poll-item {
        width: 400px;
        height: 250px;
        box-sizing: border-box;
        border: 2px solid var(--primary);
        border-radius: 12px;
        display: flex;
        gap: 15px;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        background-color: var(--cont-background);
        padding: 15px;
        user-select: none;
    }

    .poll-title {
        margin: 5px;

    }
    .poll-date{
        margin-top: auto;
    }



    .poll-description{
        margin: 0;
    }
    a:link {
        text-decoration: none;
    }

    a:visited {
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
    }

    a:active {
        text-decoration: none;
    }

    @media screen and (max-width: 680px) {
        .poll-item {
            width: 95vw;

        }
    }
</style>

<div class="main-cont">

    <CreateModal bind:showModal={$showModal} on:submitted={myEventHandler}/>


    <div class="poll-container">
        {#each $polls as poll}
            <a href="/{poll.id}">
                <div class="poll-item">
                    <h2 class="poll-title">{poll.name}</h2>
                    <p class="poll-description">{poll.description}</p>
                    <p class="poll-date" style="justify-self: flex-end;">{new Date(poll.endTime).toLocaleString()}</p>
                </div>
            </a>
        {/each}
    </div>

    {#if totalPages > 1}
    <div class="pagination-controls">
        <button on:click={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button on:click={goToNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
    {/if}
</div>

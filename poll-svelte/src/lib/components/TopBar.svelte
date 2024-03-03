<script>
    import '$lib/assets/global.css'
    import {logout} from "$lib/Store.js";
   import {showModal} from "$lib/Store.js";

    function handleLogout() {
        logout();
    }
</script>

<style>
    .title{
        margin: 0;
    }

    .top-bar{
        width: 100vw;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between; /* Ensure elements are spaced apart */
        padding: 0 20px; /* Add some padding to space elements from edges */
        box-sizing: border-box;
    }

    .add-icon{
        border: none;
        background-color: transparent;
        outline: none;
    }

    .add-icon:hover{
        cursor: pointer;
    }
</style>

<div class="top-bar">
    <h1 class="title">VoxPopuli</h1>
    <div>
        <button class="material-symbols-outlined add-icon" on:click={() => (showModal.set(true))}>add_circle</button>
        <button class="material-symbols-outlined add-icon" on:click={handleLogout}>logout</button>
    </div>
</div>

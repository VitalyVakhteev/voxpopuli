<script>
    import TopBar from "$lib/components/TopBar.svelte";
</script>

<style>
    .layout-main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        position: absolute;
        width: 100vw;
    }

    .center {
        gap: 16px;
        display: flex;
        flex: 1; /* Expand to fill remaining vertical space */
        margin: 20px 12vw; /* Adjust the margin as needed */
    }

    @media screen and (max-width: 1500px) {
        .center {
            margin: 0; /* Adjust the margin as needed */
        }
    }


</style>

<div class="layout-main">

    <div>
        <TopBar/>
    </div>
    <div class="center">
        <slot/>
    </div>
</div>
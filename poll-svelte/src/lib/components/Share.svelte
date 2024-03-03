<script>
    import '$lib/assets/global.css'

    import QrCode from "svelte-qrcode"

    export let pollId;
</script>



<QrCode value="/{pollId}" />
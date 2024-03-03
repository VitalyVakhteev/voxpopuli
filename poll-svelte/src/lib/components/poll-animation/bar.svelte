<script>
    import { currentPoll } from '$lib/Store.js';

    import {tweened} from 'svelte/motion'
    import { cubicOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';

    export let value = 0;
    export let user;

    //TODO may cause issues later if not sorted correctly
    let maxScore = $currentPoll[0].score;

    const scoreProg = tweened(0, {
        duration: 1500,
        easing: cubicOut
    });

    scoreProg.set(value);

    $: show = Math.round($scoreProg);


</script>
<style>
    .bar{
        display: flex;
        height: 25px;
        align-items: center;
        justify-content: left;
        /* 		border: 1px solid grey; */
    }

    .inner{
        border-radius: 5px;
        height: 18px;
        /* 		background: linear-gradient(to right, #a341e4 40%, blue); */
        background-color: var(--primary);
        color: var(--text);
    }
    .count{
        display:flex;
        align-items: center;
        margin-left: 5px;
        height: 18px;
        color: var(--text);
        font-size: 20px;

    }

    .cont{
        margin-bottom: 10px;
        color: var(--text);

    }

    .text{
        font-size: 16px;
        font-family: Roboto, sans-serif;
    }
</style>

<div class="cont"><div class="text" in:fly="{{delay: 200, duration: 500, x: -100, opacity: 0.5}}">{user}</div>
    <div class="bar">
        <div class="inner" style="width:{($scoreProg/maxScore)*94}%"></div><div class="count">{show}</div>
    </div>
</div>
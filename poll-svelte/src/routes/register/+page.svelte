<script>
    // Import statements and logic remain largely the same
    import axios from 'axios';
    import { goto } from "$app/navigation";

    import {isLoggedIn} from "$lib/Store.js";
    import {currentUsername} from "$lib/Store.js";

    const apiURL = 'http://localhost:8080/api' //todo change this for deployment


    import '$lib/assets/global.css'
    let username = '';
    let password = '';
    let confirmPassword = '';
    let errorMessage = '';

    // handleLogin function would also need adjustments for Svelte, not shown here

    function handleLogin(e) {
        e.preventDefault();
        // Your login logic here
    }
    async function login() {
        const response = await axios.post(`${apiURL}/users/register`, { username, password, confirmPassword });
        if (response.status === 200) {
            await goto("/login");
        }else if (response.data === "Passwords do not match") {
            // setErrorMessage("Passwords do not match. Please try again.");
        }
        else if (response.data === "Username already exists") {
            // setErrorMessage("Username already exists. Please try again.");
        }
    }

</script>
<style>
    #login-parent{
        background: var(--cont-background);
        height: fit-content;
        width: fit-content;
        border-radius: 8px;
        margin: auto;
        padding: 1rem 2rem 2rem 2rem;
        display: grid;
        width: 22rem;
    }
    .login-header{
        text-align: center;
        font-size: 35px;
        margin: 0;
        padding: 1.2rem 0;
    }
    .input-parent{
        display: grid;
        grid-template-rows: auto auto;
        margin-bottom: 0.8rem;
    }
    .input-parent label{
        font-size: 1.2rem;
        color: var(--text);
        margin-bottom: 0.2rem;
    }
    .input-parent input{
        font-size: 1.2rem;
        padding: 0.4rem 0 0.4rem 0.8rem;
        color: var(--text);
        border-radius: 5px;
        outline: none;
        border: 3.5px var(--primary) solid;
        background-color: #1a1b26;
    }
    #submit-button-button{
        background: none;
        background: var(--submit-button);
        padding: 0.35rem 0.7rem;
        font-size: 1.1rem;
        border: 3px rgb(117, 223, 170) solid;
        border-radius: 3px;
        margin: auto;
        width: 100%;
        margin-top: 0;
    }
    .pro-form{
        display: grid;
        grid-template-rows: auto auto auto auto;
        gap: 0.7rem;
    }
    .special-property-password{
        margin-bottom: 0;
    }
    .register-content-p{
        margin: 0 !important;
    }
  </style>
<div id="login-parent">
    <h2 class="login-header">Register</h2>
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
    <form class="pro-form" on:submit|preventDefault={handleLogin}>
        <div class="input-parent">
            <label>Username: </label>
            <input type="text" bind:value={username}/>
        </div>
        <div class="input-parent">
            <label>Password: </label>
            <input type="password" bind:value={password}/>
        </div>
        <div class="input-parent">
            <label>Confirm Password: </label>
            <input type="password" bind:value={confirmPassword}/>
        </div>
        <p class="register-content-p" style="color: blue; margin-top: 20px;">
            Have an account? <a href="/login">Login</a>
        </p>
        <button id="submit-button-button" type="submit" on:click={login}>Register</button>
    </form>
</div>

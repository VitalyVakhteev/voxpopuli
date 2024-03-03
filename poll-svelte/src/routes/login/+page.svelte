<script>
    import axios from 'axios';
    import { goto } from "$app/navigation";

    import {isLoggedIn} from "$lib/Store.js";
    import {currentUsername} from "$lib/Store.js";

    const apiURL = 'http://localhost:8080/api'


    import '$lib/assets/global.css'
    let username = '';
    let password = '';
    let errorMessage = '';


    function handleLogin(e) {
      e.preventDefault();
    }
    async function login() {
      const response = await axios.post(`${apiURL}/users/login`, { username, password });
      if (response.status === 200) {

        isLoggedIn.set(true);
        currentUsername.set(username);
        await goto("/");
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
        margin-bottom: 1rem;
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
        margin: 0;
    }
  </style>
  <div id="login-parent">
    <h2 class="login-header">Login</h2>
    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
    <form class="pro-form" on:submit|preventDefault={handleLogin}>
      <div class="input-parent">
        <label>Username: </label>
        <input type="text" bind:value={username}/>
      </div>
      <div class="input-parent special-property-password">
        <label>Password: </label>
        <input type="password" bind:value={password}/>
      </div>
      <p class="register-content-p" style="color: blue; margin-top: 20px;">
        Don't have an account? <a href="/register">Register</a>
      </p>
      <button id="submit-button-button" type="submit" on:click={login}>Login</button>
    </form>
  </div>

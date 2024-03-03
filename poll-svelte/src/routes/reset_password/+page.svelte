<script>
    import axios from 'axios';
    import { apiURL } from '../../lib/Store';
    import { goto } from '$app/navigation';

    let resetUsername = '';
    let oldPassword = '';
    let newPassword = '';
    let confirmPassword = '';
    let resetMessage = '';

    async function resetPassword() {
        if (newPassword !== confirmPassword) {
            resetMessage = "Passwords do not match";
            return;
        }

        try {
            const response = await axios.post(`${apiURL}/users/reset-password`, { resetUsername, newPassword });
            if (response.status === 200) {
                resetMessage = "Password reset successfully";
                goto('/login');
            }
        } catch (error) {
            resetMessage = "Failed to reset password";
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
    <h2 class="login-header">Reset Password</h2>
    {#if resetMessage}
        <p>{resetMessage}</p>
    {/if}
    <div class="input-parent">
        <label>Username: </label>
        <input type="text" bind:value={resetUsername}/>
    </div>
    <div class="input-parent">
        <label>Old Password: </label>
        <input type="text" bind:value={oldPassword}/>
    </div>
    <div class="input-parent">
        <label>New Password: </label>
        <input type="password" bind:value={newPassword}/>
    </div>
    <div class="input-parent">
        <label>Confirm Password: </label>
        <input type="password" bind:value={confirmPassword}/>
    </div>
    <button id="submit-button-button" on:click={resetPassword}>Reset Password</button>
</div>

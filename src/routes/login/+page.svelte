<script>
    import { enhance } from "$app/forms";
    import { username, loggedIn } from "$lib/store.js";

    let loginUsername = "";
    let loginPassword = "";

    let registerUsername = "";
    let registerPassword = "";



</script>

<svelte:head>
    Login Page
</svelte:head>

<h2>login</h2>
<form method="post" action="?/login" use:enhance>
    <input type="text" bind:value={loginUsername} name="username" required>
    <input type="password" bind:value={loginPassword} name="password" required>
    <button type="submit">send</button>
</form>

{$loggedIn} as {$username}

<h2>register</h2>
<form method="post" action="?/register" use:enhance>
    <input type="text" bind:value={registerUsername} name="username" required>
    <input type="password" bind:value={registerPassword} name="password" required>
    <button type="submit">send</button>
</form>

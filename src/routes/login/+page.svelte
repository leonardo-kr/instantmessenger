<script>
    import { enhance } from "$app/forms";
    import { onDestroy } from "svelte";
    import { invalidate } from "$app/navigation";
    import { username } from "$lib/store.js";

    /** @type {{username: string}} */
    export let data;

    let loginUsername = "";
    let loginPassword = "";

    let registerUsername = "";
    let registerPassword = "";

    const refreshInterval = setInterval(async () => {
        if (data != null && data.username != undefined && data.username != "") {
            username.set(data.username);
        }
        else {
            username.set("");
        }
    }, 1_000);

    onDestroy(() => {
        clearInterval(refreshInterval);
    });
</script>

<svelte:head>
    <title>Login Page</title>
</svelte:head>

<h2>login</h2>
<form method="post" action="?/login" use:enhance={() => {invalidate("app:login")}}>
    <input type="text" bind:value={loginUsername} name="username" required>
    <input type="password" bind:value={loginPassword} name="password" required>
    <button type="submit">send</button>
</form>

logged in as {$username}

<h2>register</h2>
<form method="post" action="?/register" use:enhance={() => {invalidate("app:login")}}>
    <input type="text" bind:value={registerUsername} name="username" required>
    <input type="password" bind:value={registerPassword} name="password" required>
    <button type="submit">send</button>
</form>

logged in as {data.username}

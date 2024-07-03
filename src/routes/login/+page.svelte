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

<style>
    .content {
        display:flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<svelte:head>
    <title>Login Page</title>
</svelte:head>

<div class="content">
    <h3>login</h3>
    <form method="post" action="?/login" use:enhance={() => {invalidate("app:login")}}>
        <input type="text" bind:value={loginUsername} name="username" placeholder="username" required>
        <input type="password" bind:value={loginPassword} name="password" placeholder="password" required>
        <button type="submit">send</button>
    </form>

    <h3>register</h3>
    <form method="post" action="?/register" use:enhance={() => {invalidate("app:login")}}>
        <input type="text" bind:value={registerUsername} name="username" placeholder="username" required>
        <input type="password" bind:value={registerPassword} name="password" placeholder="password" required>
        <button type="submit">send</button>
    </form>
</div>

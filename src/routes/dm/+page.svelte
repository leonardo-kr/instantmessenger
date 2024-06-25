<script>
    import { invalidate } from "$app/navigation";
    import { onDestroy } from "svelte";

    /** @type {{availableUsers: [{username: string}], username: string}} */
    export let data;

    const refreshInterval = setInterval(async () => {
        await invalidate("app:messages");
    }, 1_000);

    onDestroy(() => {
        clearInterval(refreshInterval);
    });
</script>

<svelte:head>
    <title>{data.username}'s DMs</title>
</svelte:head>

<div>
    send dm's
</div>

<div>
{#each data.availableUsers as user }
    {user.username}
    <button>{user.username}</button> <br>
{/each}
</div>

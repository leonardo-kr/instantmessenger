<script>
    import { invalidate } from "$app/navigation";
    import { enhance } from "$app/forms";
    import { onDestroy } from "svelte";

    /** @type {{availableUsers: [{username: string}], username: string}} */
    export let data;

    let newMessage = "";

    function onUserChange() {
        
    }

    const refreshInterval = setInterval(async () => {
        await invalidate("app:users");
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

{#if data.username != "" && data.username != undefined}

{#each data.availableUsers as user }
    <a href={"/dm/" + user.username}>{user.username}</a> <br>
{/each}

{/if}

</div>

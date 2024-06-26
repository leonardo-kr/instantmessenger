<script>
    import { enhance } from "$app/forms";
    import { onDestroy } from "svelte";
    import { invalidate } from "$app/navigation";

    export let data;

    let newMessage = "";

    const refreshInterval = setInterval(async () => {
        await invalidate("app:messages");
    }, 1_000);

    onDestroy(() => {
        clearInterval(refreshInterval);
    });
</script>

{#if data.username != "" && data.username != undefined}
    {#each data.messages as message}
        {message.message} <br>
    {/each}

    <form method="post" action="?/sendDirectMessage" use:enhance>
        <input type="hidden" name="username" bind:value={data.username}/>
        <input type="text" bind:value={newMessage} name="message" required>
        <button type="submit">send</button>
    </form>
{/if}

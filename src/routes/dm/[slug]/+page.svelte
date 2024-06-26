<script>
    import { enhance } from "$app/forms";
    import { onDestroy } from "svelte";
    import { invalidate } from "$app/navigation";
    import { page } from "$app/stores";

    export let data;

    let newMessage = "";

    const refreshInterval = setInterval(async () => {
        await invalidate("app:messages");
    }, 1_000);

    onDestroy(() => {
        clearInterval(refreshInterval);
    });
</script>

<style>
    .messenger {
        display: flex;
        flex-direction: row;
    }
    
    .addressbook {
        width: 25%;
        display: flex;
        flex-direction: column;
    }
</style>

{#if data.username != "" && data.username != undefined}
    <div class="messenger">
        <div class="addressbook">
            {#each data.availableUsers as user}
                {#if $page.params.slug != user.username}
                    <a href={"/dm/" + user.username}>{user.username}</a> <br>
                {:else}
                    <b>{user.username}</b>
                {/if}
            {/each}
        </div>

        <div class="messages">
            {#each data.messages as message}
                {message.message} <br>
            {/each}

            <form method="post" action="?/sendDirectMessage" use:enhance>
                <input type="hidden" name="username" bind:value={data.username}/>
                <input type="text" bind:value={newMessage} name="message" required>
                <button type="submit">send</button>
            </form>
        </div>
    </div>
{/if}

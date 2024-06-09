<script>
    import { enhance } from "$app/forms";
    import { onDestroy } from "svelte";
    import { invalidate } from "$app/navigation";
    export let data;

    let parsed = undefined;

    let test = " \n";
    let newMessage = "";

    /**
     * Handles form submission for sending messages
     * @param {SubmitEvent} event
     */
    async function handleSendMessage(event) {
        const form = event.target;
        console.log(form);
        console.log(newMessage);

        newMessage = "";
    }

    /**
     * Focuses an element
     * @param {HTMLElement} element
     */
    function focus(element) {
      element.focus();
    }

    const refreshInterval = setInterval(async () => {
        await invalidate("app:messages");

    }, 1_000);

    onDestroy(() => {
        clearInterval(refreshInterval);
    });
</script>

<svelte:head>
    <title>Chat</title>
</svelte:head>

<br>
<table>
    <tr>
        <td><h3>message</h3></td>
        <td><h3>date</h3></td>
    </tr>

    <tbody>

    {#each data.messages as message}
        <tr>
            <td>{message.message}</td> <td> {new Date(message.unixTime)} </td>
        </tr>
    {/each}
    </tbody>
</table>

<form method="post" action="?/sendGlobalMessage" use:enhance>
    <input type="text" bind:value={newMessage} name="message" required use:focus>
    <button type="submit">send</button>
</form>

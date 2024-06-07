<script>
    import { enhance } from "$app/forms";
    import { onDestroy } from "svelte";
    import {invalidate} from "$app/navigation";
    export let data;

    // let messages = data;
    let parsed = undefined;

    // let lastMessage = data.messages.at(data.messages.length - 1);

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

    const refreshInterval = setInterval(async () => {
        await invalidate("app:messages");

    }, 1_000);

    async function receiveMessages() {
        await invalidate("app:messages");
    }

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
<!--action="?/sendMessage"-->
<!--on:submit|preventDefault={handleSendMessage}-->
<form method="post" action="?/sendMessage" use:enhance>
    <input type="text" bind:value={newMessage} name="message" required>
    <button type="submit">send</button>
</form>
<!--<form method="post" action="?/loadMessages" use:enhance>-->
<!--    <button type="submit">reload messages</button>-->
<!--</form>-->

<!--<a href="?/getMessages">loadMessage</a>-->
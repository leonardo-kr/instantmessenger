<script>
    import { enhance } from "$app/forms";
    import { onDestroy } from "svelte";
    import { invalidate } from "$app/navigation";
    export let data;
    
    /** @type {HTMLElement} */
    let inputElement;

    let newMessage = "";

    // async function focusInputEnhance({ }) {
    //   inputElement.focus();
    //   return ({});
    // }

    /**
     * Focuses an element
     * @param {HTMLElement} element
     */
    function focus(element) {
      element.focus();
    }

    function submission() {
      inputElement.focus();
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
    <input type="text" bind:value={newMessage} bind:this={inputElement} name="message" required use:focus>
    <button type="submit">send</button>
</form>

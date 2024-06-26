import * as db from "$lib/server/database.js";

/** @type {import("./$types").PageServerLoad} */
export async function load( { depends, cookies, params } ) {
    const username = cookies.get("session") || "";
    const otherUser = params.slug || "";
    const messages = db.getDirectMessages(otherUser, username);
    const availableUsers = db.getUsers(username);
    depends("app:messages");
    /** @type {{messages: [string], username: string, availableUsers: [string]}} */
    return {
        messages,
        username,
        availableUsers,
    };
}

export const actions = {
    sendDirectMessage: async ({ request, params }) => {
        const formData = await request.formData();
        const message = formData.get('message');
        const username = formData.get('username');
        const otherUser = params.slug || "";

        db.sendDirectMessage(message, username, otherUser);
        return message;
    },
    getDirectMessages: async ({ cookies, params }) => {
        const username = cookies.get("session") || "";
        const otherUser = params.slug || "";
        const messages = db.getDirectMessages(otherUser, username);
        return {
            messages
        };
    }
}

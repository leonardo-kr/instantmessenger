import * as db from "$lib/server/database.js";

/** @type {import("./$types").PageServerLoad} */
export async function load( { depends, cookies } ) {
    const username = cookies.get("session") || "";
    const availableUsers = db.getUsers(username);
    depends("app:messages");
    return {
        availableUsers,
        username,
    };
}

export const actions = {
    sendDirectMessage: async ({ request }) => {
        const formData = await request.formData();
        const message = formData.get('message');
        const username = formData.get('username');

        db.sendGlobalMessage(message, username);
        return message;
    },
    getDirectMessages: async ({ cookies }) => {
        const messages = db.getDirectMessages(cookies.get("session") || "", "test");
        return {
            messages
        };
    }
}

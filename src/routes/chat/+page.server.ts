import * as db from "$lib/server/database";

/** @type {import("./$types").PageServerLoad} */
export async function load( { depends, cookies } ) {
    const messages = db.getGlobalMessages();
    const username = cookies.get("session");
    depends("app:messages");
    return {
        messages,
        username,
    };
}

/**
 * Sends a message from the user.
 * @param {string} message
 * @returns {Promise<{result: number}>}
 */
async function sendGlobalMessage(message) {
    const result = db.sendGlobalMessage(message);
    return {
        result,
    };
}

export const actions = {
    sendGlobalMessage: async ({ request }) => {
        const formData = await request.formData();
        const message = formData.get('message');
        const username = formData.get('username');

        db.sendGlobalMessage(message, username);
        return message;
    },
    getGlobalMessages: async () => {
        const messages = db.getGlobalMessages();
        return {
            messages
        };
    }
}

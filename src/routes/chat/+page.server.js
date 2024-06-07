import * as db from "$lib/server/database.js";

/** @type {import("./$types").PageServerLoad} */
export async function load( {fetch, depends} ) {
    const messages = db.getMessages();
    depends("app:messages");
    return {
        messages,
    };
}

/**
 * Sends a message from the user.
 * @param {string} message
 * @returns {number}
 */
async function sendMessage(message) {
    const result = db.sendMessage(message);
    return {
        result,
    };
}

export const actions = {
    sendMessage: async ({ request }) => {
        const formData = await request.formData();
        const message = formData.get('message');
        //
        // return db.sendMessage(message);

        const data = await request;

        // console.log(data);
        // console.log(message);
        db.sendMessage(message);
        return message;
    },
    getMessages: async ({ request }) => {
        const messages = db.getMessages();
        return {
            messages
        };
    }
}

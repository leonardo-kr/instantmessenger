import * as db from "$lib/server/database.js";

/** @type {import("./$types").PageServerLoad} */
export async function load( {depends} ) {
    const messages = db.getGlobalMessages();
    depends("app:messages");
    return {
        messages,
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
        //
        // return db.sendMessage(message);

        const data = await request;

        // console.log(data);
        // console.log(message);
        db.sendGlobalMessage(message);
        return message;
    },
    getGlobalMessages: async () => {
        const messages = db.getGlobalMessages();
        return {
            messages
        };
    }
}

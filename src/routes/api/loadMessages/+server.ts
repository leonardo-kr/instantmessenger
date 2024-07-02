import * as db from "$lib/server/database.js";

import {json} from "@sveltejs/kit";

export function GET({ request }) {
    const messages = db.getGlobalMessages();
    return json(messages);
}

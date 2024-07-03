import * as db from "$lib/server/database";

/** @type {import("./$types").PageServerLoad} */
export async function load( { depends, cookies } ) {
    const username = cookies.get("session") || "";
    const availableUsers = db.getUsers(username);
    depends("app:users");
    return {
        availableUsers,
        username,
    };
}


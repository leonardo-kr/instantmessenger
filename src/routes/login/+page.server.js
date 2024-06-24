import * as db from "$lib/server/database.js";
import { username, loggedIn } from "$lib/store.js";
import { get } from "svelte/store";

export const actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        const formUsername = formData.get("username");
        const formPassword = formData.get("password");

        if (db.login(formUsername, formPassword)) {
            loggedIn.set(true);
            // loggedIn.update((value) => {
            //     value = true;
            // });
            username.set(formUsername);
            // username.update((value) => {
            //     value = formUsername;
            // });
            console.log("loggedIn");
            console.log(get(loggedIn));
        }
        else {
            loggedIn.set(false);
            username.set("");
        }
    },
    register: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        db.createUser(username, password);
    }
}
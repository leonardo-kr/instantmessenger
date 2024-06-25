import * as db from "$lib/server/database.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formUsername = formData.get("username");
        const formPassword = formData.get("password");

        if (db.login(formUsername, formPassword)) {
            // username = formUsername;
            // return {username: formUsername};
            cookies.set("session", formUsername, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                // expire after 1 month
                maxAge: 60 * 60 * 24 * 30,
            });
            redirect(302, "/");
        }
        else {
            return {username: ""};
        }
    },
    register: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        db.createUser(username, password);
        
        return {username: username};
    }
}

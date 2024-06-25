import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit'

export const load = async ({ cookies }) => {
    // we only use this endpoint for the api
    // and don't need to see the page
    await cookies.delete("session", {
        path: "/",
    });
    redirect(302, '/login')
}

export const actions = {
    default: async ({ request, cookies }) => {
        // eat the cookie
        // cookies.set("session", '', {
        //     path: '/',
        //     httpOnly: true,
        //     sameSite: "strict",
        //     expires: new Date(0),
        // })

        console.log("deleted?");
        await cookies.delete("session");

        // redirect the user
        redirect(302, '/login')
    },
}

/** @type {import("./$types").LayoutServerLoad} */
export const load = ({ cookies }) => {
    const username = cookies.get("session");

    return { username };
}

import Database from "better-sqlite3";
import { read } from "$app/server";

function connectDb() {
    const db = new Database("db/chat.db", { verbose: console.log });

    if (!read("/db/chat.db")) {
        console.log("didn't find db");
        const stmt = db.prepare(`CREATE TABLE "chat" (message text, unixTime integer)`);
        stmt.run();
    }
    return db
}

/**
 * Gets messages from the database and returns them.
 * @returns {Object.<message: string, unixTime: number>}
 */
export function getMessages() {
    // run only once
    const db = connectDb()

    const msgStmt = db.prepare("SELECT * FROM chat");

    /** @typedef {{message: string, unixTime: number}} */
    const messages = msgStmt.all();

    // console.log(messages);

    db.close();

    return messages;
}

/**
 * Sends and saves a message to the database and returns 0 if no error occurred and 1 if there was an error.
 * @param {string} message
 * @returns {number}
 */
export function sendMessage(message) {
    const db = connectDb();
    const currentTime = Date.now();
    console.log(message + " @ " + currentTime);

    const createStmt = db.prepare("INSERT INTO chat VALUES (?, ?)");
    createStmt.run(message, currentTime);

    db.close();

    return 0;
}
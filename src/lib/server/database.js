import Database from "better-sqlite3";
import { read } from "$app/server";

function connectDb() {
 
    try {
        read("/db/chat.db");
        return new Database("db/chat.db", { verbose: console.log });
    }
    catch {
        console.log("creating db");
        const db = new Database("db/chat.db", { verbose: console.log });

        // creating tables
        const global = db.prepare(`CREATE TABLE "global" (message text, unixTime integer, 
            sender INTEGER NOT NULL CONSTRAINT fk_senderId REFERENCES users(rowid))`);
        global.run();

        const accounts = db.prepare(`CREATE TABLE "users" (username text UNIQUE NOT NULL, password text NOT NULL,
            salt text)`
        );
        accounts.run();

        const directMessages = db.prepare(`CREATE TABLE "directMessages" (
            sender INTEGER NOT NULL CONSTRAINT fk_senderId REFERENCES users(rowid), 
            receiver INTEGER NOT NULL CONSTRAINT fk_receiverId REFERENCES users(rowid), 
            message text)`
        );
        directMessages.run();

        return db;
    }
}

/**
 * Gets messages from the database and returns them.
 * @returns {Object.<message: string, unixTime: number>}
 */
export function getGlobalMessages() {
    const db = connectDb()

    const msgStmt = db.prepare("SELECT * FROM global");

    /** @typedef {{message: string, unixTime: number}} */
    const messages = msgStmt.all();

    db.close();

    return messages;
}

/**
 * Sends and saves a message to the database and returns 0 if no error occurred and 1 if there was an error.
 * @param {string} message
 * @returns {number} Result
 */
export function sendGlobalMessage(message) {
    const db = connectDb();
    const currentTime = Date.now();
    console.log(message + " @ " + currentTime);

    const createStmt = db.prepare("INSERT INTO global VALUES (?, ?)");
    createStmt.run(message, currentTime);

    db.close();

    return 0;
}

/**
 * Creates a user and hashes the password. Salt is stored in a different column.
 * @param {string} username
 * @param {string} password
 */
export function createUser(username, password) {
    const db = connectDb();

    const salt = "no";
    const createStmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
    createStmt.run(username, password, salt)
}

/**
 * Checks if the password is the correct one
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
export function login(username, password) {
    const db = connectDb();

    // salt won't be used right now
    const fetchStmt = db.prepare("SELECT username, password, salt FROM users WHERE username = ?");

    const user = fetchStmt.get(username);

    db.close();

    return user.password === password;

}
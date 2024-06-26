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

        const users = db.prepare(`CREATE TABLE "users" (id INTEGER PRIMARY KEY, username text UNIQUE NOT NULL, password text NOT NULL, 
            salt text)`
        );
        users.run();

        const global = db.prepare(`CREATE TABLE "global" (message text, unixTime integer, 
            sender INTEGER NOT NULL CONSTRAINT fk_senderId REFERENCES users(id))`);
        global.run();

        const directMessages = db.prepare(`CREATE TABLE "directMessages" (
            sender INTEGER NOT NULL CONSTRAINT fk_senderId REFERENCES users(id), 
            receiver INTEGER NOT NULL CONSTRAINT fk_receiverId REFERENCES users(id), 
            message text, unixTime INTEGER
            )`);
        directMessages.run();

        return db;
    }
}

/**
 * Gets messages from the database and returns them.
 * @returns {Object.<message: string, unixTime: number, username: string>}
 */
export function getGlobalMessages() {
    const db = connectDb()

    const msgStmt = db.prepare("SELECT message, unixTime, username FROM global, users where global.sender = users.id");

    /** @typedef {{message: string, unixTime: number, username: string}} */
    const messages = msgStmt.all();

    db.close();
    return messages;
}

/**
 * Gets all users to select for direct message
 * @param {string} currentUser
 * @returns {*} users
 */
export function getUsers(currentUser) {
    const db = connectDb();

    const userStmt = db.prepare(`SELECT username FROM users WHERE username != ?`);

    const result = userStmt.all(currentUser);

    return result;
}

/**
 * Sends and saves a message to the database and returns 0 if no error occurred and 1 if there was an error.
 * @param {string} message
 * @param {string} username
 * @returns {number} Result
 */
export function sendGlobalMessage(message, username) {
    const db = connectDb();
    const currentTime = Date.now();
    console.log(message + " @ " + currentTime);

    const createStmt = db.prepare("INSERT INTO global(message, unixTime, sender) VALUES (?, ?, (select id from users where users.username = ?))");
    createStmt.run(message, currentTime, username);

    db.close();

    return 0;
}

/**
 * Gets direct messages from a given user and a given receiver.
 * @param {string} sender
 * @param {string} receiver
 * @returns {Object.<message: string, receiver: string, unixTime: number>}
 */
export function getDirectMessages(sender, receiver) {
    const db = connectDb();

    const msgStmt = db.prepare(`SELECT * FROM directMessages inner join users on 
        id = (select id from users where users.username = ?) 
        and receiver = (select id from users where users.username = ?) 
        and sender = (select id from users where users.username = ?)`);

    /** @typedef {{message: string, receiver: string, unixTime: number}} */
    const messages = msgStmt.all(sender, receiver, sender);

    return messages;
}

/**
 * Sends a direct message.
 * @param {string} message
 * @param {string} sender
 * @param {string} receiver
 */
export function sendDirectMessage(message, sender, receiver) {
    const db = connectDb();
    const currentTime = Date.now();

    console.log("test");

    const sendDmStmt = db.prepare(`INSERT INTO directMessages(sender, receiver, message, unixTime) VALUES (
        (SELECT id FROM users WHERE users.username = ?),
        (SELECT id FROM users WHERE users.username = ?),
        ?, ?)`);

    sendDmStmt.run(sender, receiver, message, currentTime);
}

/**
 * Creates a user and hashes the password. Salt is stored in a different column.
 * @param {string} username
 * @param {string} password
 */
export function createUser(username, password) {
    const db = connectDb();

    const salt = "no";
    const createStmt = db.prepare("INSERT INTO users(username, password, salt) VALUES (?, ?, ?)");
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
    
    if (user == null) {
        return false;
    }
    return user.password === password;

}

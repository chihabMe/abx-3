"use server";

import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

// Function to hash the password using scrypt
export const hashPassword = async (password: string) => {
	const salt = randomBytes(16).toString("hex");
	const hashedPassword = (await scryptAsync(password, salt, 64)) as Buffer;
	return `${salt}:${hashedPassword.toString("hex")}`;
};

// Function to verify the password
export const verifyPassword = async (password: string, storedHash: string) => {
	const [salt, hash] = storedHash.split(":");
	const hashedPassword = (await scryptAsync(password, salt, 64)) as Buffer;
	return hashedPassword.toString("hex") === hash;
};



// CLI behavior when run directly
if (require.main === module) {
	const arg = process.argv[2];
	if (!arg) {
		console.error("Usage: tsx password.ts <password>");
		process.exit(1);
	}
	hashPassword(arg).then((hash) => {
		console.log("Hashed password:", hash);
	});
}

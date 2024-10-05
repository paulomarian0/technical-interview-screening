import { Thing } from "./schema";

export const createThing = async (message: string) => {
	const doc = new Thing({
		message,
	});
	await doc.save();
	return { id: doc._id, message: doc.message };
};

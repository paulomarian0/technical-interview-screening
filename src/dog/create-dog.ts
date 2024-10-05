import { Dog } from "./schema";

export const createDog = async (age: number, breed: string, name: string) => {
	const doc = new Dog({
		age,
		breed,
		name,
	});
	await doc.save();
	return { id: doc._id, message: doc.age, breed: doc.breed, name: doc.name };
};

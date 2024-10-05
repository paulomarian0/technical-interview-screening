import { Dog } from "./schema";

export const getDog = async (dogId: string) => {
	const doc = await Dog.findById(dogId);
	if (!doc) {
		return;
	}
	return {
		id: doc.id,
		age: doc.age,
		breed: doc.breed,
		name: doc.name,
	};
};

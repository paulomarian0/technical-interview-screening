import { Dog } from "./schema";

export const getAllDogs = async () => {
	return await Dog.find();
};

import { Thing } from "./schema";

export const getAllThings = async () => {
	return await Thing.find();
};

import Boom from "@hapi/boom";
import { Lifecycle } from "@hapi/hapi";
import { getAllDogs } from "@/dog/get-all-dogs";

export const listAllDogsHandler: Lifecycle.Method = async () => {
	try {
		const dogs = await getAllDogs();
		return { dogs };
	} catch (e) {
		console.error(e);
		throw Boom.internal();
	}
};

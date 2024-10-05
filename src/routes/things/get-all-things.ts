import Boom from "@hapi/boom";
import { Lifecycle } from "@hapi/hapi";
import { getAllThings } from "@/thing/get-all-things";

export const listAllThingsHandler: Lifecycle.Method = async () => {
	try {
		const things = await getAllThings();
		return { things };
	} catch (e) {
		console.error(e);
		throw Boom.internal();
	}
};

import Boom from "@hapi/boom";
import { Lifecycle } from "@hapi/hapi";
import { z } from "zod";
import { createThing } from "@/thing";

const payloadSchema = z.object({
	message: z.string(),
});

export const createThingHandler: Lifecycle.Method = async (request) => {
	let payload;
	try {
		payload = payloadSchema.parse(request.payload);
	} catch (e: any) {
		throw Boom.badRequest("Validation error", e.issues);
	}
	const { message } = payload;

	try {
		return await createThing(message);
	} catch (e) {
		console.error(e);
		throw Boom.internal();
	}
};

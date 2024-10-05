import { Plugin } from "@hapi/hapi";
import { createThingHandler } from "./create-thing";
import { listAllThingsHandler } from "./get-all-things";
import { getThingHandler } from "./get-thing";

export const routes: Plugin<{}> = {
	register: (server, options) => {
		server.route([
			{
				method: "GET",
				path: "/{thingId}",
				options: {
					handler: getThingHandler,
				},
			},
			{
				method: "POST",
				path: "/",
				options: {
					handler: createThingHandler,
				},
			},
			{
				method: "GET",
				path: "/",
				options: {
					handler: listAllThingsHandler,
				},
			},
		]);
	},
	name: "things",
};

export default routes;

import { Plugin } from "@hapi/hapi";
import { createDogHandler } from "./create-dog";
import { listAllDogsHandler } from "./get-all-dogs";
import { getDogHandler } from "./get-dog";

export const dogRoutes: Plugin<{}> = {
	register: (server, options) => {
		server.route([
			{
				method: "GET",
				path: "/{dogId}",
				options: {
					handler: getDogHandler,
				},
			},
			{
				method: "POST",
				path: "/",
				options: {
					handler: createDogHandler,
				},
			},
			{
				method: "GET",
				path: "/",
				options: {
					handler: listAllDogsHandler,
				},
			},
		]);
	},
	name: "dogs",
};

export default dogRoutes;

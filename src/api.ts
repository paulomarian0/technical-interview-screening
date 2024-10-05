import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import { routes } from "./routes";
import { establishMongoConnection } from "./util/mongo";

const server = Hapi.server({
	port: process.env.PORT || 80,
});

(async () => {
	await establishMongoConnection();
	await routes(server);
	await server.start();
	console.log("Server running on %s", server.info.uri);
})();

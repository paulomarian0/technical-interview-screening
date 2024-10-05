import { Server } from '@hapi/hapi';
import dogRoutes from './dogs';

export const routes = async (server: Server) => {
  await server.register(dogRoutes, {
    routes: { prefix: '/v1.0/dogs' },
  });
};

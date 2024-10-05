import { Plugin } from '@hapi/hapi';
import { createDogHandler } from './create-dog';
import { deleteDogHandler } from './delete-dog';
import { listAllDogsHandler } from './get-all-dogs';
import { getDogHandler } from './get-dog';
import { updateDogHandler } from './update-dog';

export const dogRoutes: Plugin<{}> = {
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/{dogId}',
        options: {
          handler: getDogHandler,
        },
      },
      {
        method: 'POST',
        path: '/',
        options: {
          handler: createDogHandler,
        },
      },
      {
        method: 'GET',
        path: '/',
        options: {
          handler: listAllDogsHandler,
        },
      },
      {
        method: 'DELETE',
        path: '/{dogId}',
        options: {
          handler: deleteDogHandler,
        },
      },
      {
        method: 'PUT',
        path: '/{dogId}',
        options: {
          handler: updateDogHandler,
        },
      },
    ]);
  },
  name: 'dogs',
};

export default dogRoutes;

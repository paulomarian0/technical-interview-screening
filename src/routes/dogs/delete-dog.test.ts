import { Server } from '@hapi/hapi';
import { createDog } from '@/dog/create-dog'; // Importando createDog para criar um cachorro para teste
import { invalidUUID } from '@/util/invalid-uuid';
import { establishMongoConnection } from '@/util/mongo';
import { deleteDogHandler } from './delete-dog';

const server = new Server();

beforeAll(async () => {
  await establishMongoConnection();

  server.route({
    method: 'DELETE',
    path: '/{dogId}',
    options: {
      handler: deleteDogHandler,
    },
  });
  await server.start();
});

describe('deleteDogHandler', () => {
  let dogId: string;

  beforeEach(async () => {
    const createdDog = await createDog({
      name: 'Buddy',
      breed: 'Labrador',
      age: 3,
    });
    dogId = createdDog.id.toString();
  });

  it('Deletes a dog and responds with the deleted dog', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: `/${dogId}`,
    });

    expect(res.statusCode).toBe(200);
  });

  it('Returns 404 if the dog does not exist', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: `/${invalidUUID}`,
    });

    expect(res.statusCode).toBe(404);
    const responsePayload = JSON.parse(res.payload);
    expect(responsePayload.message).toBe('Dog not found');
  });
});

afterAll(async () => {
  await server.stop();
});

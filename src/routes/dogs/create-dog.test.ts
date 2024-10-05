import { Server } from '@hapi/hapi';
import { establishMongoConnection } from '@/util/mongo';
import { createDogHandler } from './create-dog';

const server = new Server();

beforeAll(async () => {
  await establishMongoConnection();

  server.route({
    method: 'POST',
    path: '/',
    options: {
      handler: createDogHandler,
    },
  });
  await server.start();
});

describe('createDogHandler', () => {
  it('Responds with a dog id', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/',
      payload: {
        name: 'Buddy',
        breed: 'Labrador',
        age: 3,
      },
    });

    const responsePayload = JSON.parse(res.payload);
    expect(responsePayload).toHaveProperty('id');
    expect(responsePayload.name).toBe('Buddy');
    expect(responsePayload.breed).toBe('Labrador');
    expect(responsePayload.age).toBe(3);
  });

  it('Returns 500 if there is an error', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/',
      payload: {
        breed: 'Labrador',
      },
    });

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await server.stop();
});

import { Server } from '@hapi/hapi';
import {
  beforeAll,
  describe,
  it,
  beforeEach,
  afterEach,
  afterAll,
  expect,
  vi,
} from 'vitest';
import { createDog } from '@/dog';
import { Dog } from '@/dog/schema';
import { establishMongoConnection } from '@/util/mongo';
import { listAllDogsHandler } from './get-all-dogs';

const server = new Server();

beforeAll(async () => {
  await establishMongoConnection();

  server.route({
    method: 'GET',
    path: '/dogs',
    options: {
      handler: listAllDogsHandler,
    },
  });

  await server.start();
});

describe('listAllDogsHandler', () => {
  beforeEach(async () => {
    await createDog({ age: 3, breed: 'Labrador', name: 'Buddy' });
    await createDog({ age: 5, breed: 'Beagle', name: 'Charlie' });
  });

  it('Returns a list of all dogs', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/dogs',
    });

    expect(res.statusCode).toBe(200); // Espera-se que a resposta seja 200
    const responseBody = JSON.parse(res.payload);
    expect(responseBody).toHaveProperty('dogs');
    expect(responseBody.dogs).toHaveLength(2); // Espera-se que haja 2 cachorros
    expect(responseBody.dogs[0]).toMatchObject({
      age: 3,
      breed: 'Labrador',
      name: 'Buddy',
    });
    expect(responseBody.dogs[1]).toMatchObject({
      age: 5,
      breed: 'Beagle',
      name: 'Charlie',
    });
  });

  afterEach(async () => {
    await Dog.deleteMany({});
  });
});

afterAll(async () => {
  await server.stop();
});

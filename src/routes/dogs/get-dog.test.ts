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
import { invalidUUID } from '@/util/invalid-uuid';
import { establishMongoConnection } from '@/util/mongo';
import { getDogHandler } from './get-dog';

const server = new Server();

beforeAll(async () => {
  await establishMongoConnection();

  server.route({
    method: 'GET',
    path: '/dogs/{dogId}',
    options: {
      handler: getDogHandler,
    },
  });

  await server.start();
});

describe('getDogHandler', () => {
  let dogId: string;

  beforeEach(async () => {
    const dogData = { age: 4, breed: 'Bulldog', name: 'Max' };
    const createdDog = await createDog(dogData);
    dogId = createdDog.id.toString();
  });

  it('Responds with a dog object when a valid ID is provided', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `/dogs/${dogId}`,
    });

    expect(res.statusCode).toBe(200);
    const dog = JSON.parse(res.payload);
    expect(dog).toHaveProperty('id', dogId);
    expect(dog).toHaveProperty('age', 4);
    expect(dog).toHaveProperty('breed', 'Bulldog');
    expect(dog).toHaveProperty('name', 'Max');
  });

  it('Throws a 404 error when an invalid ID is provided', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `/dogs/${invalidUUID}`,
    });

    expect(res.statusCode).toBe(404);
    const errorResponse = JSON.parse(res.payload);
    expect(errorResponse.message).toBe('Dog not found');
  });

  afterEach(async () => {
    await Dog.deleteMany({});
  });
});

afterAll(async () => {
  await server.stop();
});

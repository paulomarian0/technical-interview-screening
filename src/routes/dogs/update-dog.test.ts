import { Server } from '@hapi/hapi';
import { createDog } from '@/dog';
import { Dog } from '@/dog/schema';
import { invalidUUID } from '@/util/invalid-uuid';
import { establishMongoConnection } from '@/util/mongo';
import { updateDogHandler } from './update-dog';

const server = new Server();

beforeAll(async () => {
  await establishMongoConnection();

  server.route({
    method: 'PUT',
    path: '/{dogId}',
    options: {
      handler: updateDogHandler,
    },
  });

  await server.start();
});

describe('updateDogHandler', () => {
  let dogId: string;

  beforeEach(async () => {
    const dogData = { age: 3, breed: 'Labrador', name: 'Buddy' };
    const createdDog = await createDog(dogData);
    dogId = createdDog.id.toString();
  });

  it('Updates an existing dog record', async () => {
    const res = await server.inject({
      method: 'PUT',
      url: `/${dogId}`,
      payload: {
        name: 'Max',
        age: 4,
      },
    });

    expect(res.statusCode).toBe(200);
    const updatedDog = JSON.parse(res.payload);
    expect(updatedDog).toEqual({
      message: 'Dog updated successfully',
      dog: expect.objectContaining({
        _id: dogId,
        age: 4,
        name: 'Max',
      }),
    });

    const dbDog = await Dog.findById(dogId);
    expect(dbDog).not.toBeNull();
    expect(dbDog?.age).toBe(4);
    expect(dbDog?.name).toBe('Max');
  });

  it('Returns not found error if the dog does not exist', async () => {
    const res = await server.inject({
      method: 'PUT',
      url: `/${invalidUUID}`,
      payload: {
        name: 'Max',
      },
    });

    expect(res.statusCode).toBe(404);
    const errorResponse = JSON.parse(res.payload);
    expect(errorResponse.message).toBe('Dog not found');
  });
});

afterEach(async () => {
  await Dog.deleteMany({});
});

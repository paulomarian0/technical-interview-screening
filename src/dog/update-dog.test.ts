import { invalidUUID } from '@/util/invalid-uuid';
import { establishMongoConnection } from '@/util/mongo';
import { createDog } from './create-dog';
import { Dog } from './schema';
import { updateDog } from './update-dog';

beforeAll(async () => {
  await establishMongoConnection();
});

describe('updateDog', () => {
  let dogId: string;

  beforeEach(async () => {
    const dogData = { age: 3, breed: 'Labrador', name: 'Buddy' };
    const createdDog = await createDog(dogData);
    dogId = createdDog.id.toString();
  });

  it('Updates an existing dog record with new values', async () => {
    const response = await updateDog({ dogId, age: 4, name: 'Max' });

    expect(response).toEqual({
      message: 'Dog updated successfully',
      dog: expect.objectContaining({
        id: dogId,
        age: 4,
        name: 'Max',
      }),
    });

    const updatedDog = await Dog.findById(dogId);
    expect(updatedDog).not.toBeNull();
    expect(updatedDog?.age).toBe(4);
    expect(updatedDog?.name).toBe('Max');
  });

  it('Returns null if the dog does not exist', async () => {
    const response = await updateDog({ dogId: invalidUUID, age: 5 });
    expect(response).toBeNull();

    const nonExistentDog = await Dog.findById(invalidUUID);
    expect(nonExistentDog).toBeNull();
  });

  it('Updates only specified fields', async () => {
    const response = await updateDog({ dogId, age: 5 });

    expect(response).toEqual({
      message: 'Dog updated successfully',
      dog: expect.objectContaining({
        id: dogId,
        age: 5,
        name: 'Buddy',
      }),
    });

    const updatedDog = await Dog.findById(dogId);
    expect(updatedDog).not.toBeNull();
    expect(updatedDog?.age).toBe(5);
    expect(updatedDog?.name).toBe('Buddy');
  });
});

afterEach(async () => {
  await Dog.deleteMany({});
});

import { invalidUUID } from '@/util/invalid-uuid';
import { establishMongoConnection } from '@/util/mongo';
import { createDog } from './create-dog';
import { deleteDog } from './delete-dog';
import { Dog } from './schema';

beforeAll(async () => {
  await establishMongoConnection();
});

describe('deleteDog', () => {
  let dogId: string;

  beforeEach(async () => {
    const dogData = { age: 3, breed: 'Labrador', name: 'Buddy' };
    const createdDog = await createDog(dogData);
    dogId = createdDog.id.toString();
  });

  it('Deletes an existing dog record', async () => {
    const response = await deleteDog(dogId);

    expect(response).toEqual({ message: 'Dog deleted successfully' });

    const deletedDog = await Dog.findById(dogId);
    expect(deletedDog).toBeNull();
  });

  it('Returns undefined if dog does not exist', async () => {
    const response = await deleteDog(invalidUUID);
    expect(response).toBeUndefined();

    const deletedDog = await Dog.findById(invalidUUID);
    expect(deletedDog).toBeNull();
  });
});

afterEach(async () => {
  await Dog.deleteMany({});
});

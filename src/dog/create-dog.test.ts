import { establishMongoConnection } from '@/util/mongo';
import { createDog } from './create-dog';
import { Dog } from './schema';

beforeAll(async () => {
  await establishMongoConnection();
});

describe('createDog', () => {
  it('Inserts a new dog record', async () => {
    const dogData = { age: 3, breed: 'Labrador', name: 'Buddy' };
    const createdDog = await createDog(dogData);

    const doc = await Dog.findOne({ _id: createdDog.id });
    expect(doc).not.toBeNull();
    expect(doc?.age).toBe(dogData.age);
    expect(doc?.breed).toBe(dogData.breed);
    expect(doc?.name).toBe(dogData.name);
  });
});

afterEach(async () => {
  await Dog.deleteMany({});
});

import { establishMongoConnection } from '@/util/mongo';
import { createDog } from './create-dog';
import { getAllDogs } from './get-all-dogs';
import { Dog } from './schema';

beforeAll(async () => {
  await establishMongoConnection();
});

describe('getAllDogs', () => {
  beforeEach(async () => {
    await createDog({ age: 3, breed: 'Labrador', name: 'Buddy' });
    await createDog({ age: 5, breed: 'Beagle', name: 'Charlie' });
  });

  it('Returns all dogs', async () => {
    const dogs = await getAllDogs();

    expect(dogs).toHaveLength(2);
    expect(dogs[0]).toMatchObject({
      age: 3,
      breed: 'Labrador',
      name: 'Buddy',
    });
    expect(dogs[1]).toMatchObject({
      age: 5,
      breed: 'Beagle',
      name: 'Charlie',
    });
  });

  afterEach(async () => {
    await Dog.deleteMany({});
  });
});

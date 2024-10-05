import { beforeAll, describe, it, expect, afterEach } from 'vitest';
import { invalidUUID } from '@/util/invalid-uuid';
import { establishMongoConnection } from '@/util/mongo';
import { createDog } from './create-dog';
import { getDog } from './get-dog';
import { Dog } from './schema';

beforeAll(async () => {
  await establishMongoConnection();
});

describe('getDog', () => {
  let dogId: string;

  beforeEach(async () => {
    const dogData = { age: 4, breed: 'Bulldog', name: 'Max' };
    const createdDog = await createDog(dogData);
    dogId = createdDog.id.toString();
  });

  it('Retrieves a dog by ID', async () => {
    const dog = await getDog(dogId);
    expect(dog).toBeDefined();
    expect(dog).toHaveProperty('id', dogId);
    expect(dog).toHaveProperty('age', 4);
    expect(dog).toHaveProperty('breed', 'Bulldog');
    expect(dog).toHaveProperty('name', 'Max');
  });

  it('Returns undefined for a non-existent dog', async () => {
    const dog = await getDog(invalidUUID);
    expect(dog).toBeUndefined();
  });

  afterEach(async () => {
    await Dog.deleteMany({});
  });
});

import { establishMongoConnection } from '@/util/mongo';
import { createThing } from './create-thing';
import { Thing } from './schema';

beforeAll(async () => {
  await establishMongoConnection();
});

describe('createThing', () => {
  it('Inserts a new customer record', async () => {
    await createThing('test');
    const doc = await Thing.findOne({ message: 'test' });
    expect(doc).not.toBeNull();
  });
});

afterEach(async () => {
  await Thing.deleteMany({});
});

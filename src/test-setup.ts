import { establishMongoConnection } from '@/util/mongo';

export default async () => {
  await establishMongoConnection();
  console.log('MongoDB connection established for testing.');
};

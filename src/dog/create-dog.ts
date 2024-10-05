import Boom from '@hapi/boom';
import { Dog } from './schema';

export const createDog = async ({
  age,
  breed,
  name,
}: {
  age: number;
  breed: string;
  name: string;
}) => {
  const alreadyExists = await Dog.findOne({ name });

  if (alreadyExists) {
    throw Boom.badRequest('Dog with this name already exists');
  }

  const doc = new Dog({
    age,
    breed,
    name,
  });

  await doc.save();
  return { id: doc._id, age: doc.age, breed: doc.breed, name: doc.name };
};

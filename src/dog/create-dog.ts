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
  const doc = new Dog({
    age,
    breed,
    name,
  });
  await doc.save();
  return { id: doc._id, age: doc.age, breed: doc.breed, name: doc.name };
};

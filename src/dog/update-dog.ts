import { Dog } from './schema';

export const updateDog = async ({ dogId, name, age }) => {
  const dog = await Dog.findById({ _id: dogId });

  console.log(dog);
  if (!dog) return;

  return { message: 'Dog updated successfully' };
};

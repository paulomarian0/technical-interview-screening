import { Dog } from './schema';

export const getDog = async (dogId: string) => {
  const dog = await Dog.findById(dogId);
  if (!dog) {
    return;
  }

  return {
    id: dog.id,
    age: dog.age,
    breed: dog.breed,
    name: dog.name,
  };
};

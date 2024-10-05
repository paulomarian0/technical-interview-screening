import { Dog } from './schema';

export const updateDog = async ({
  dogId,
  age,
  name,
}: {
  dogId: string;
  age?: number;
  name?: string;
}) => {
  const dog = await Dog.findOneAndUpdate({ _id: dogId, name: name, age: age });
  if (!dog) return;

  return { message: 'Dog updated successfully' };
};

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
  const updateFields: { name?: string; age?: number } = {};

  if (name) updateFields.name = name;
  if (age) updateFields.age = age;

  const dog = await Dog.findByIdAndUpdate(
    dogId,
    { $set: updateFields },
    { new: true },
  );

  if (!dog) {
    return null;
  }

  return { message: 'Dog updated successfully', dog };
};

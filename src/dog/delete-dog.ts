import { Dog } from './schema';

export const deleteDog = async (id: string) => {
  const dog = await Dog.findByIdAndDelete(id);

  if (dog) return { message: 'Dog deleted successfully' };
};

import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { updateDog } from '@/dog/update-dog';

const payloadSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
});

export const updateDogHandler: Lifecycle.Method = async (request) => {
  const { dogId } = request.params;

  try {
    const { age, name } = payloadSchema.parse(request.payload);

    const updatedDog = await updateDog({
      dogId,
      age,
      name,
    });

    if (!updatedDog) {
      return Boom.notFound('Dog not found');
    }

    return updatedDog;
  } catch (e) {
    return Boom.badImplementation('An error occurred while updating the dog');
  }
};

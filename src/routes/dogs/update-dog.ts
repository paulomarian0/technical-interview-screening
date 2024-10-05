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
  const { age, name } = payloadSchema.parse(request.payload);

  try {
    const dog = await updateDog({
      dogId,
      age,
      name,
    });

    if (!dog) {
      return Boom.notFound('Dog not found');
    }

    return dog;
  } catch (e) {
    console.error({ e });
  }
};

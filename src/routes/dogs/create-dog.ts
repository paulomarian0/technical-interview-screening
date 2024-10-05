import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { createDog } from '@/dog';

const payloadSchema = z.object({
  age: z.number().optional(),
  breed: z.string().optional(),
  name: z.string().optional(),
});

export const createDogHandler: Lifecycle.Method = async (request) => {
  try {
    const payload = payloadSchema.parse(request.payload);

    if (!payload.age || !payload.breed || !payload.name) {
      throw Boom.badRequest('Invalid request payload');
    }

    const { name, breed, age } = payload;

    return await createDog({ name, breed, age });
  } catch (e: any) {
    throw Boom.badRequest(
      e.output.payload.message ?? 'Invalid request payload',
    );
  }
};

import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { createDog } from '@/dog';

const payloadSchema = z.object({
  name: z.string(),
  breed: z.string(),
  age: z.number(),
});

export const createDogHandler: Lifecycle.Method = async (request) => {
  const payload = payloadSchema.parse(request.payload);
  const { name, breed, age } = payload;

  try {
    return await createDog({ name, breed, age });
  } catch (e) {
    console.error(e);
    throw Boom.internal();
  }
};

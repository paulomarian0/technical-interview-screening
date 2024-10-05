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
  let payload;
  try {
    payload = payloadSchema.parse(request.payload);
  } catch (e: any) {
    throw Boom.badRequest('Validation error', e.issues);
  }
  const { name, breed, age } = payload;

  try {
    return await createDog(age, breed, name);
  } catch (e) {
    console.error(e);
    throw Boom.internal();
  }
};

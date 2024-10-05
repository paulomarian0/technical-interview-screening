import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { deleteDog } from '@/dog/delete-dog';

export const deleteDogHandler: Lifecycle.Method = async ({
  params: { dogId },
}) => {
  let dog;
  try {
    dog = await deleteDog(dogId);
  } catch (e) {
    throw Boom.internal();
  }
  if (!dog) {
    throw Boom.notFound('Dog not found');
  }
  return dog;
};

import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { deleteDog } from '@/dog/delete-dog';

export const deleteDogHandler: Lifecycle.Method = async ({
  params: { dogId },
}) => {
  const dog = await deleteDog(dogId);

  if (!dog) {
    throw Boom.notFound('Dog not found');
  }
  return dog;
};

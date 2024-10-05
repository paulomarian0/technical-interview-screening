import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { getDog } from '@/dog';

export const getDogHandler: Lifecycle.Method = async ({
  params: { dogId },
}) => {
  const dog = await getDog(dogId);

  if (!dog) {
    throw Boom.notFound('Dog not found');
  }
  return dog;
};

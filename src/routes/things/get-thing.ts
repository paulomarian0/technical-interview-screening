import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { getThing } from '@/thing';

export const getThingHandler: Lifecycle.Method = async ({
  params: { thingId },
}) => {
  let thing;
  try {
    thing = await getThing(thingId);
  } catch (e) {
    throw Boom.internal();
  }
  if (!thing) {
    throw Boom.notFound('Thing not found');
  }
  return thing;
};

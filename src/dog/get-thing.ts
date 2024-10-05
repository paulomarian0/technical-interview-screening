import { Thing } from './schema';

export const getThing = async (thingId: string) => {
  const doc = await Thing.findById(thingId);
  if (!doc) {
    return;
  }
  return {
    id: doc.id,
    message: doc.message,
  };
};

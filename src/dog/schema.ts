import { model, Schema } from 'mongoose';

/*
Properties must be added to both the interface and schema.
*/

export interface IThing {
  message?: string;
}

const schema = new Schema<IThing>({
  message: String,
}, { timestamps: true });

export const Thing = model<IThing>(
  'Thing',
  schema,
  'things',
);

import { model, Schema } from "mongoose";

/*
Properties must be added to both the interface and schema.
*/

export interface IDog {
	name?: string;
	breed?: string;
	age?: number;
}

const schema = new Schema<IDog>(
	{
		name: { type: String, required: true },
		breed: String,
		age: Number,
	},
	{ timestamps: true },
);

export const Dog = model<IDog>("Dog", schema, "dogs");

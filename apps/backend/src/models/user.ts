import * as mongoose from 'mongoose';
import { } from "@elachisync"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sound: { type: String, required: true },
  }
);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.model('User', userSchema);
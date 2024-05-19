import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessiontoken: { type: String, select: false },
  },
});

export const UserModal = mongoose.model("User", UserSchema);

// controller that needs to be separate file for now its okay.

export const getUsers = () => UserModal.find();
export const getUserByEmail = (email: string) =>
  UserModal.findOne({
    email,
  });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModal.findOne({
    "authentication.sessiontoken": sessionToken,
  });

export const getUserById = (id: string) => UserModal.findById(id);

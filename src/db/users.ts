// Importing necessary dependencies
import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

// Defining the schema for the User model
const UserSchema = new mongoose.Schema({
    name:      { type: String, required: true },
    surname:   { type: String, required: true },
    username:  { type: String, required: true },
    email:     { type: String, required: true },
    authentication: {
        password:     { type: String, required: true, select: false },
        salt:         { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    credit:    { type: String, default: '100' },
});

// Creating the User model based on the schema
export const UserModel = mongoose.model('User', UserSchema);

// CRUD operations for the User model

// Get all users
export const getUser = () => UserModel.find();
// Get user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// Get user by session token
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
// Get user by ID
export const getUserById = (id: string) => UserModel.findById(id);
// Create a new user
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save()
    .then((user) => user.toObject());
// Delete user by ID
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
// Update user by ID
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

import mongoose, { Document, Model, Schema } from 'mongoose';
import { UserModel } from './users';

// Define the schema
const GraphSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  node: { type: Schema.Types.Mixed, default: [] },
});

// Create the model
export const GraphModel = mongoose.model('Graph', GraphSchema);

// CRUD operations

// Get all graphs with user information
export const getAllGraphs = () => GraphModel.find().populate('user', 'email');

// Get graph by ID with user information
export const getGraphById = (id: string) => GraphModel
  .findById(id)
  .populate('user', 'email');

// Get user by graph ID
export const getUserByGraphId = (graphId: string) => GraphModel
  .findById(graphId)
  .populate('user', 'email')
  .then((graph) => (graph ? graph.user : null));

// Create a new graph
export const createGraph = (values: Record<string, any>) => GraphModel.create(values);

// Update graph by ID
export const updateGraphById = (id: string, values: Record<string, any>) =>
  GraphModel.findByIdAndUpdate(id, values, { new: true });

// Delete graph by ID
export const deleteGraphById = (id: string) => GraphModel.findByIdAndDelete(id);

// Add node to a graph
export const addNode = (graphId: string, newNode: any) =>
  GraphModel.findByIdAndUpdate(
    graphId,
    { $push: { node: newNode } },
    { new: true }
  );

// Update node in a graph
export const updateNode = (graphId: string, nodeId: string, updatedNode: any) =>
  GraphModel.findOneAndUpdate(
    { _id: graphId, 'node._id': nodeId },
    { $set: { 'node.$': updatedNode } },
    { new: true }
  );

// Delete node from a graph
export const deleteNode = (graphId: string, nodeId: string) =>
  GraphModel.findByIdAndUpdate(
    graphId,
    { $pull: { node: { _id: nodeId } } },
    { new: true }
  );

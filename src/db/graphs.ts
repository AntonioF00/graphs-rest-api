import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for the document
interface IGraph extends Document {
  name: string;
  idUser: number;
  node: any[]; // You may want to specify a more precise type for the 'node' array
}

// Define the schema
const GraphSchema = new mongoose.Schema<IGraph>({
    name: { type: String, required: true },
    idUser: { type: Number, required: true },
    node: { type: Schema.Types.Mixed, default: [] },
  });

// Create the model
export const GraphModel: Model<IGraph> = mongoose.model('Graph', GraphSchema);

// CRUD operations

// Get all graphs
export const getAllGraphs = () => GraphModel.find();

// Get graph by ID
export const getGraphById = (id: string) => GraphModel.findById(id);

// Create a new graph
export const createGraph = (values: Record<string, any>) => new GraphModel(values)
  .save()
  .then((graph) => graph.toObject());

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

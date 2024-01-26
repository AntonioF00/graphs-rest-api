import mongoose, { Document, Model, Schema } from 'mongoose';

interface GraphNode {
  source: string;
  target: string;
  length: number;
}

interface GraphDocument extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  nodes: string[];
  edges: GraphNode[];
}

const GraphSchema = new Schema<GraphDocument>({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nodes: { type: [String], default: [] },
  edges: { type: [{ source: String, target: String, length: Number }], default: [] },
});

export const GraphModel: Model<GraphDocument> = mongoose.model('Graph', GraphSchema);

// CRUD operations

export const getAllGraphs = () => GraphModel.find();

export const getGraphById = (id: string) => GraphModel
  .findById(id)
  .populate('user', 'email');

export const getUserByGraphId = (graphId: string) => GraphModel
  .findById(graphId)
  .populate('user', 'email')
  .then((graph) => (graph ? graph.user : null));

export const createGraph = (values: Record<string, any>) => GraphModel.create(values);

export const updateGraphById = (id: string, values: Record<string, any>) =>
  GraphModel.findByIdAndUpdate(id, values, { new: true });

export const deleteGraphById = (id: string) => GraphModel.findByIdAndDelete(id);

export const addNode = (graphId: string, newNode: any) =>
  GraphModel.findByIdAndUpdate(
    graphId,
    { $push: { nodes: newNode } },
    { new: true }
  );

export const updateNode = (graphId: string, nodeId: string, updatedNode: any) =>
  GraphModel.findOneAndUpdate(
    { _id: graphId, 'nodes': nodeId },
    { $set: { 'nodes.$': updatedNode } },
    { new: true }
  );

export const deleteNode = (graphId: string, nodeId: string) =>
  GraphModel.findByIdAndUpdate(
    graphId,
    { $pull: { nodes: nodeId } },
    { new: true }
  );

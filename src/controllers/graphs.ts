import { Request, Response } from 'express';
import * as GraphService from '../db/graphs';

// Esempio di controller per gestire le richieste relative al grafo
export const getAllGraphs = async (req: Request, res: Response) => {
  try {
    const graphs = await GraphService.getAllGraphs();
    res.status(200).json(graphs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getGraphById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const graph = await GraphService.getGraphById(id);
    if (graph) {
      res.status(200).json(graph);
    } else {
      res.status(404).json({ error: 'Graph not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createGraph = async (req: Request, res: Response) => {
  const graphData = req.body;
  try {
    const newGraph = await GraphService.createGraph(graphData);
    res.status(201).json(newGraph);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateGraphById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const graphData = req.body;
  try {
    const updatedGraph = await GraphService.updateGraphById(id, graphData);
    if (updatedGraph) {
      res.status(200).json(updatedGraph);
    } else {
      res.status(404).json({ error: 'Graph not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteGraphById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedGraph = await GraphService.deleteGraphById(id);
    if (deletedGraph) {
      res.status(200).json({ message: 'Graph deleted successfully' });
    } else {
      res.status(404).json({ error: 'Graph not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


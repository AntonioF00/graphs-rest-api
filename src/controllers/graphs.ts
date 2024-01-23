import express from 'express';
import { getAllGraphs, createGraph } from '../db/graphs';


export const createGraphs = async (req: express.Request, res: express.Response) => {

    try{
        const graph = await createGraph(req);

        if(!graph){
            console.log("ERROR IN CREATING GRAPH");
            return res.status(400).json({ message : "Failed to create Graph."});
        }

        return res.sendStatus(200).json(graph);

    }catch(error){
        console.log("ERROR IN CREATING GRAPH");
        console.log(error);
        return res.status(400).json({ message : "Failed to create Graph."});
    }
};

export const getGraphs = async (req: express.Request, res: express.Response) => {
    try{

        const graphs = await getAllGraphs();
        return res.sendStatus(200).json(graphs);

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error creating graph"});
    }
};

export const createNode = async (req: express.Request, res: express.Response) => {
    try{
        
    }catch(error){
        console.log(error);
        return res.sendStatus(500).json({message: "Error creating node"});
    }
};


export const deleteNode = async (req: express.Request, res: express.Response) => {
    try{
        
    }catch(error){
        console.log(error);
        return res.sendStatus(500).json({message: "Error deleting node"});
    }
};

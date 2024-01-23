import express from 'express';
import { getAllGraphs } from '../db/graphs';

export const getGraphs = async (req: express.Request, res: express.Response) => {
    try{

        const graphs = await getAllGraphs();
        return res.sendStatus(200).json(graphs);

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error creating graph"});
    }
};


import express from 'express';
import * as GraphController from '../controllers/graphs';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  // Middleware di autenticazione per tutte le rotte
  router.use(isAuthenticated);

  // Rotte per le operazioni CRUD sui grafi
  router.get('/graphs', GraphController.getAllGraphs);
  router.get('/graphs/:id', GraphController.getGraphById);
  router.post('/graphs', GraphController.createGraph);
  router.put('/graphs/:id', GraphController.updateGraphById);
  router.delete('/graphs/:id', GraphController.deleteGraphById);

  return router;
};

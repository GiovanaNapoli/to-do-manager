import * as TaskController from "./controller/taskController";
import * as SessionController from "./controller/sessionController";
import * as UserController from "./controller/userController";
import * as ProjectController from "./controller/projectController";
import express from "express";
import { celebrate, Segments, Joi } from "celebrate";

const routes = express.Router();

// Login
routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      login: Joi.string().required(),
    }),
  }),
  SessionController.create
);

routes.post(
  "/users",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      login: Joi.string().required(),
    }),
  }),
  UserController.create
);

routes.get("/projects", ProjectController.getAll).post(
  "/projects",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  ProjectController.create
);

routes
  .get(
    "/tasks/:project_id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        project_id: Joi.string().required(),
      }),
    }),
    TaskController.getAll
  )
  .post(
    "/tasks",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        column: Joi.string().required(),
        project_id: Joi.string().required(),
      }),
    }),
    TaskController.create
  )
  .put(
    "/tasks/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    TaskController.update
  )
  .delete(
    "/tasks/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    TaskController.down
  );

export default routes;

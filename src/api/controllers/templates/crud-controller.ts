import { Request, Response } from "express";
import type { TModels } from "../../../database/entities";
import logger from "../../../utils/logger";
import services from "../../services";

class CrudController {
  model: TModels;
  service: InstanceType<typeof services[TModels]>;

  constructor(model: TModels) {
    this.model = model;
    this.service = new services[model](model);
  }

  create = async (req: Request, res: Response) => {
    try {
      const createdItem = await this?.service?.create(req.body);

      if (createdItem instanceof Error) throw createdItem;

      res.status(201).json(createdItem);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 500).send({ message: err.message });
    }
  };

  createMany = async (req: Request, res: Response) => {
    try {
      const createdItems = await this.service.createMany(req.body);

      if (createdItems instanceof Error) throw createdItems;

      res.status(201).json(createdItems);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 500).send({ message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      console.log("Body: ", req.body);
      const updatedItem = this.service.update(Number(id), req.body);

      if (updatedItem instanceof Error) throw updatedItem;

      res.status(200).send(`Updated ${this.model} of id ${id} successfully`);

    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 500);
    }
  };

  updateMany = async (req: Request, res: Response) => {
    try {
      const ids = req.body.ids;
      const updatedItems = await this.service.updateMany(ids, req.body);

      if (!updatedItems) throw updatedItems;

      res.status(200).send(`Updated ${this.model}s of ids ${ids.join(", ")} successfully`);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const deletedItem = await this.service.delete(Number(id));

      if (deletedItem instanceof Error) throw deletedItem;

      res.status(200).send(`Removed ${this.model} of id ${id} successfully`);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  };

  deleteMany = async (req: Request, res: Response) => {
    try {
      const ids = req.body.ids;

      const deletedItems = await this.service.deleteMany(ids);

      if (deletedItems instanceof Error) throw deletedItems;

      res.status(200).send(`Removed ${this.model}s of ids ${ids.join(", ")} successfully`);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 500);
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {

      const allItems = await this.service.getAll();

      if (allItems instanceof Error) throw allItems;

      res.status(200).send(allItems);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 404).json({ message: err.message });
    }
  };

  getMany = async (req: Request, res: Response) => {
    try {
      const ids = req.body.ids;

      const manyItems = await this.service.getMany(ids);

      if (manyItems instanceof Error) throw manyItems;

      res.status(200).send(manyItems);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 404).json({ message: err.message });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const oneItem = await this.service.getOne(Number(id));

      if (oneItem instanceof Error) throw oneItem;

      res.status(200).send(oneItem);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 404).json({ message: err.message });
    }
  };
}

export default CrudController;
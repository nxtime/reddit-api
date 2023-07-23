import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import models, { TModelTypes, TModels, modelsRelations } from "../../../database/entities";
import logger from "../../../utils/logger";
import repositories from "../../../database/repositories";

class CrudServices {
  model: TModels;
  repository: typeof repositories[TModels];

  constructor(model: TModels) {
    this.model = model;
    this.repository = repositories[model];
  }

  async create(data: DeepPartial<TModelTypes>): Promise<TModelTypes> {
    const createdItem = this.repository.manager.create(
      models[this.model],
      data
    ) as unknown as TModelTypes;

    return await createdItem.save();
  }

  async createMany(data: DeepPartial<TModelTypes>[]): Promise<TModelTypes[]> {
    const createdItems: TModelTypes[] = [];

    await Promise.all(data.map(async (item) => {
      createdItems.push(await this.create(item));
    }));

    return createdItems;
  }

  async update(id: number, data: DeepPartial<typeof models[TModels]>): Promise<UpdateResult> {
    try {

      const updatedItem = await this.repository.update(
        {
          id
        },
        data
      );

      return updatedItem;
    } catch (err) {
      logger.error(err);
      throw new Error(`Error updating ${this.model} of id ${id}`);
    }
  }

  async updateMany(ids: number[], data: DeepPartial<typeof models[TModels]>[]): Promise<string> {
    try {

      const response: UpdateResult[] = [];

      await Promise.all(ids.map(async (id, index) => {
        response.push(await this.update(id, data[index]));
      }));

      return response.join(", ");
    } catch (err) {
      logger.error(err);
      throw new Error(`Error updating ${this.model} of ids ${ids.join(", ")}`);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async deleteMany(ids: number[]): Promise<DeleteResult[]> {
    const response: DeleteResult[] = [];

    await Promise.all(ids.map(async (id) => {
      response.push(await this.delete(id));
    }));

    return response;
  }

  async getAll(): Promise<TModelTypes[]> {
    return this.repository.find({
      relations: modelsRelations[this.model],
    });
  }

  async getMany(ids: number[]): Promise<TModelTypes[]> {
    const allItems = await this.getAll()
    const foundItems = allItems.filter((item) => {
      if (ids.includes(item.id)) return item;
    });

    if (!foundItems.length) throw new Error(`No ${this.model} found with ids ${ids.join(", ")}`);

    return foundItems;
  }

  async getOne(id: number): Promise<TModelTypes> {
    const foundItem = await this.repository.findOne({
      where: {
        id
      },
      relations: modelsRelations[this.model]
    });

    if (!foundItem) throw new Error(`No ${this.model} found with id ${id}`);

    return foundItem;
  }
}

export default CrudServices;

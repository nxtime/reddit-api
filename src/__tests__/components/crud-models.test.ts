import "dotenv/config";
import models, { TModels } from "../../database/entities";
import DatabaseProvider from "../../database/connection";
import app from "../../api/app";
import modelsBody from "../models/body";
import request from "supertest";

type TMethods = "post" | "get" | "patch" | "delete";

const endpoints = [
  {
    name: "create",
    url: "create",
    method: "POST",
    statusCode: 201,
    expected: "all",
  },
  // {
  //   name: "Update",
  //   url: "update/:id",
  //   method: "PATCH",
  //   statusCode: 200
  // },
  // {
  //   name: "Update Many",
  //   url: "update/many",
  //   method: "POST",
  //   statusCode: 200
  // },
  // {
  //   name: "Delete",
  //   url: "1",
  //   method: "DELETE",
  //   statusCode: 200,
  //   expected: "user",
  // },
  // {
  //   name: "Create Many",
  //   url: "create/many",
  //   method: "POST",
  //   statusCode: 201,
  // },
] as const;

describe("API Endpoints", () => {
  beforeAll(async () => {
    await DatabaseProvider.initialize();
  });

  (Object.keys(models) as TModels[]).forEach((model) => {

    if (model === "follower") return;
    describe(model, () => {
      endpoints.forEach((endpoint) => {
        if (endpoint.expected !== "all" && endpoint.expected !== model) return;
        it(`Should ${endpoint.name} ${model}`, async () => {
          const response = await request(app)[endpoint.method.toLowerCase() as TMethods](`/${model}/${endpoint.url}`)
            .send(modelsBody[model]);

          expect(response.statusCode).toBe(endpoint.statusCode);
          // Add more assertions as needed
        });
      });
    });
  });
});
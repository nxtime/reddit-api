// import "dotenv/config";
import ENV, { initializeEnvVariables } from "../constants/envs.enum";
import DatabaseProvider from "../database/connection";
import { initializeCrudRoutes } from "../api/routes";
import logger from "./logger";

const checkEnvVariables = () => {
  let isWithoutVariable = false;

  Object.entries(ENV).forEach(([key, value]) => {
    if (value === undefined || value?.trim() === "") {
      logger.error(`Env variable ${key} is not set`);
      isWithoutVariable = true;
    }
  });

  if (isWithoutVariable) process.exit(1);
};

const initialize = async () => {
  await initializeEnvVariables();

  checkEnvVariables();

  DatabaseProvider.initialize().then(() => {
    logger.info("Database connection established");
  }).catch((error) => {
    logger.error("Database connection failed");
    logger.error(error);
  });

  initializeCrudRoutes();
};

export default initialize;
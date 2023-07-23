import ENV from "./constants/envs.enum";
import app from "./api/app";
import logger from "./utils/logger";

app.listen(ENV.PORT, () => {
  console.clear();
  logger.info(`Listening on port ${ENV.PORT}! 🚀`);
});
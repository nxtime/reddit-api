const ENV = {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT,
};

export const initializeEnvVariables = () => new Promise((resolve) => {
  ENV.APP_NAME = process.env.APP_NAME;
  ENV.PORT = process.env.PORT;

  resolve("done");
});


export default ENV;

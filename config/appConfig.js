function loadEnvironmentVariables(keyname) {
  const envVar = process.env[keyname];

  if (!envVar) {
    throw new Error(`Must include ${keyname} as environment variable`);
  }
  return envVar;
}

module.exports = {
  postgressUri: loadEnvironmentVariables("POSTGRES_URI"),
};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      useESM: true, // Permitir ESModules
    },
  },
  extensionsToTreatAsEsm: [".ts"], // Trata los archivos .ts como ESModules
};

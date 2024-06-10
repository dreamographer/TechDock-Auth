module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.ts"], 
  testMatch: ["**/__test__/**/*.test.ts"],
  forceExit:true,
  verbose:true
};

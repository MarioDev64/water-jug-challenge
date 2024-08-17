export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.css$': 'jest-transform-css',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(svg|jpg|png)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

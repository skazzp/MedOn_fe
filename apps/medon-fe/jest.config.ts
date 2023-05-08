export default {
  displayName: 'medon-fe',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/medon-fe',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './jest.setup.ts',
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '\\.svg$': '<rootDir>/src/components/__tests__/__mocks__/svg.ts',
  },
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
};

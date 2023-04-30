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
    './jest-setup.ts',
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
};

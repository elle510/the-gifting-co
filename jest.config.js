const esModules = ['@agm', 'ngx-bootstrap', 'monaco-editor'].join('|');

module.exports = {
    setupFiles: [
        // '<rootDir>/config/polyfills.js',
        '<rootDir>/tests/setupTests.js',
        // 'jest-localstorage-mock'
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        // [`(${esModules}).+\\.(js|jsx)?$`]: 'babel-jest'
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        'commons/helpers/requestHelper': '<rootDir>/tests/__mocks__/requestHelper.js'
    },
    modulePaths: [
        '<rootDir>/src/',
        '<rootDir>/src/routes/',
        '<rootDir>/src/stores/',
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}'
    ],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    snapshotSerializers: [
        'enzyme-to-json/serializer'
    ],
};

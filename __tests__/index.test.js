const fs = require('fs');
const path = require('path');
const { upVersion } = require('../src/index.js');

const initialData = JSON.stringify({ version: '1.3.2' });

// BEGIN
describe('upVersion test', () => {
  const fixture = path.join(process.cwd(), '__fixtures__/package.json');
  const getVersion = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8')).version;

  afterEach(() => {
    fs.writeFileSync(fixture, initialData);
  });

  test('Default version increase', () => {
    upVersion(fixture);
    const version = getVersion(fixture);
    expect(version).toBe('1.3.3');
  });
  test('Patch version increase', () => {
    upVersion(fixture, 'path');
    const version = getVersion(fixture);
    expect(version).toBe('1.3.3');
  });
  test('Minor version increase', () => {
    upVersion(fixture, 'minor');
    const version = getVersion(fixture);
    expect(version).toBe('1.4.0');
  });
  test('Major version increase', () => {
    upVersion(fixture, 'major');
    const version = getVersion(fixture);
    expect(version).toBe('2.0.0');
  });
  test('Incorrect version number', () => {
    fs.writeFileSync(fixture, JSON.stringify({ version: '2' }));
    expect(() => upVersion(fixture)).toThrow();
  });
});

// END

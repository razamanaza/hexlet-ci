const fs = require('fs');

// BEGIN
const getIncreasedVersion = (versionNumber, version) => {
  const versions = versionNumber.split('.').map((v) => Number(v));
  if (versions.length !== 3) {
    throw new Error('The version is not complaining the SemVer standard');
  }
  const [major, minor, path] = versions;
  switch (version) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    default:
      return `${major}.${minor}.${path + 1}`;
  }
};

const upVersion = (filepath, versionPart) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  const dataJson = JSON.parse(data);
  const updatedVersion = getIncreasedVersion(dataJson.version, versionPart);
  fs.writeFileSync(
    filepath,
    JSON.stringify({
      ...dataJson,
      version: updatedVersion,
    }),
  );
};
// END

module.exports = { upVersion };

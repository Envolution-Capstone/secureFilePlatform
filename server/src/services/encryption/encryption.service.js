
// TODO create encryption service

const { Log } = require("../../logging/logging");

class Encryption {

  encrypt = async (entityId, fileContent) => {
    return fileContent;
  };

  decrypt = async (entityId, fileContent) => {
    return fileContent;
  };
};

module.exports = {
  Encryption,
};
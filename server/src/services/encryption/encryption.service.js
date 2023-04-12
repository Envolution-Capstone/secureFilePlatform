
const { KeyService } = require('../key/key.service');
    
class Encryption {

  #keyService;

  constructor(keyService) {
    this.#keyService = keyService;
  }

  encrypt = async (entityId, fileContent) => {

  };

  decrypt = async (entityId, fileContent) => {

  };
};

module.exports = {
  Encryption,
};
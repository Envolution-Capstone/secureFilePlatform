
const crypto = require('crypto');
    
class Encryption {

  #keyService;

  constructor(keyService) {
    this.#keyService = keyService;
  }


  encrypt = async (entityId, fileContent) => {
    const key = await this.#keyService.getKey(entityId);
    const iv = await this.#keyService.getIV(entityId);
console.log("TESTING FROM NEW CODE " ,key)
    if (!key) {
      return null;
    }

    
    const algorithm ="aes-256-ctr"
    const cipher = crypto.createCipheriv(algorithm, key, iv);
 
    return Buffer.concat([iv, cipher.update(fileContent),cipher.final()]);
  };

  decrypt = async (entityId, fileContent) => {
   
    const key = await this.#keyService.getKey(entityId);

    if (!key) {
      return null;
    }
    const algorithm ="aes-256-ctr"
    const decipher = crypto.createDecipheriv(algorithm, key, fileContent.slice(0, 16));
    return Buffer.concat([decipher.update(fileContent.slice(16)), decipher.final()]);
  };
};

module.exports = {
  Encryption,
};
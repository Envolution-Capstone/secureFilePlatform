const { Log } = require("../../logging/logging");

class FileService {

  #repo;

  constructor(repo){
    this.#repo = repo;
  }

  async getInfo(userID) {
    return await this.#repo.getInfo(userID);
  }

  async get(userID, fileId) {
    return await this.#repo.get(userID, fileId);
  }

  async create(req) {
    const meta = {
      userid: req.userid,
      filename: req.body.filename,
      timestamp: Date.now(),
      size: req.files.file[0].size
    };

    if (!this.#checkReq(req)) {
      return false;
    }

    return await this.#repo.create(meta, req.files.file[0].buffer);
  }

  async delete(userid, fileid) {
    return await this.#repo.deleteFile(userid, fileid);
  }


  #checkReq(req) {
    if (req.userid && req.body.filename && req.files.file[0].buffer) {
      return true;
    }
    return false;
  }
}

module.exports = {
  FileService,
};
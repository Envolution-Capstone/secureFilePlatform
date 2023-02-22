
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
      groupid: req.body.groupid,
      filename: req.body.filename,
    };

    if (!this.checkReq(req)) {
      return false;
    }

    return await this.#repo.create(meta, req.files.file[0].buffer);
  }

  checkReq(req) {
    console.log(req);
    if (req.userid && (req.body.groupid || req.body.groupid === null ) && req.body.filename && req.files.file[0].buffer) {
      return true;
    }
    return false;
  }
}

module.exports = {
  FileService,
};
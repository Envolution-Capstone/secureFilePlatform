
class FileService {

  #repo;

  constructor(repo){
    this.#repo = repo;
  }

  async getInfo(userID) {
    this.#repo.getInfo(userID);
  }

  async get(userID, fileId) {
    return this.#repo.get(userID, fileId);
  }

  async create(req) {
    const meta = {
      user: req.userid,
      filename: req.body.filename,
    };

    return this.#repo.create(meta, req.file);
  }
}

module.exports = {
  FileService,
};
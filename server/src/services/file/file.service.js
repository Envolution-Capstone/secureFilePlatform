const { Repo } = require("../../repos/base.repo");
const { File } = require('./../../repos/file/file.model')

class FileService {
  #repo;

  constructor() {
    this.#repo = new Repo(File);
  }
}

module.exports = {
  FileService,
};
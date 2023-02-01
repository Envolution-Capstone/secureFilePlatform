const mongoose = require('mongoose');
const { Log } = require('../logging/logging');

const ConnectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
  .then(()=>{
    Log.info(`Connected To Database`);
  })
  .catch((error)=>{
    Log.error(`Unable To Connect To DataBase: ${error}`);
  });
};

class Repo {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async get(select) {
    return await this.#model.find(select);
  }

  async create(object) {
    return await this.#model.create(object);
  }

  async delete(select) {
    return await this.#model.delete(select);
  }

  async update(select, data) {
    return await this.#model.updateOne(select, data);
  }
}

module.exports = {
  Repo,
  ConnectDB,
};
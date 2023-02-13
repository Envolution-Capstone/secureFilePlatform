const { UserService } = require("../services/user/user.service");
const { FileService } = require("../services/file/file.service");
const { GroupService } = require("../services/group/group.service");
const { FileRepo } = require("../repos/file/file.repo");



const createServices = () => {
  const services = {'user': null, 'file': null, 'group': null};

  fileRepo = new FileRepo();

  services.user = new UserService();
  services.file = new FileService(fileRepo);
  services.group = new GroupService();

  return services;
}

module.exports = {
  createServices,
}
const { UserService } = require("../services/user/user.service");
const { FileService } = require("../services/file/file.service");
const { GroupService } = require("../services/group/group.service");

const createServices = () => {
  const services = {'user': null, 'file': null, 'group': null};

  services.user = new UserService();
  services.file = new FileService();
  services.group = new GroupService();

  return services;
}

module.exports = {
  createServices,
}
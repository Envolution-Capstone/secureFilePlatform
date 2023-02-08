const { UserService } = require("../services/user/user.service");
const { FileService } = require("../services/file/file.service");
const { GroupService } = require("../services/group/group.service");

const createServices = (firebase) => {
  const services = {'user': null, 'file': null, 'group': null};

  services.user = new UserService(firebase);
  services.file = new FileService(firebase);
  services.group = new GroupService(firebase);

  return services;
}

module.exports = {
  createServices,
}
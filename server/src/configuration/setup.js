const { UserService } = require("../services/user/user.service");
const { FileService } = require("../services/file/file.service");
const { GroupService } = require("../services/group/group.service");
const { FileRepo } = require("../repos/file/file.repo");
const { Encryption } = require("../services/encryption/encryption.service");
const { GroupRepo } = require("../repos/group/group.repo");
const { UserRepo } = require("../repos/user/user.repo");
const { KeyService } = require("../services/key/key.service");



const createServices = () => {
  const services = {'user': null, 'file': null, 'group': null, 'encryption': null, 'key': null};

  services.key = new KeyService();
  services.encryption = new Encryption(services.key);
  
  fileRepo = new FileRepo(services.encryption);
  groupRepo = new GroupRepo(services.encryption);
  userRepo = new UserRepo();

  services.user = new UserService(userRepo);
  services.group = new GroupService(groupRepo, userRepo);
  services.file = new FileService(fileRepo);

  return services;
}

module.exports = {
  createServices,
}
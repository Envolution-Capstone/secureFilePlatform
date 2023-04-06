const { UserService } = require('../services/user/user.service');
const { UserRepo } = require('../repos/user/user.repo');

describe('UserService', () => {
  let userService;
  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
  
    userRepo.getUser = jest.fn();
    userRepo.getUserGroups = jest.fn();
    userRepo.getUserInvites = jest.fn();
    userRepo.createUser = jest.fn();
    userRepo.deleteUser = jest.fn();
  
    userService = new UserService(userRepo);
  });
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUser', () => {
    it('should return user data for a given user ID', async () => {
      // Arrange
      const mockUserID = 'testUserID';
      const mockUserData = {
        uid: 'testUserID',
        name: 'Test User',
        email: 'test@example.com',
        photoURL: 'https://test.com/photo.jpg',
        groups: [],
        invites: [],
      };

      userRepo.getUser.mockResolvedValue(mockUserData);

      // Act
      const result = await userService.getUser({ params: { userid: mockUserID } });

      // Assert
      expect(userRepo.getUser).toHaveBeenCalledWith(mockUserID);
      expect(result).toEqual(mockUserData);
    });
  });

  describe('createUser', () => {
    it('should create a user and return true if successful', async () => {
        //Arrange
      const mockUserInfo = {
        uid: 'testUserID',
        name: 'Test User',
        email: 'test@example.com',
        photoURL: 'https://test.com/photo.jpg',
        groups: [],
        invites: [],
      };

        //Act
      userRepo.createUser.mockResolvedValue(true);

      const result = await userService.userLogin({ body: mockUserInfo });

        //Assert
      expect(userRepo.createUser).toHaveBeenCalledWith(mockUserInfo);
      expect(result).toBe(true);
    });

        //Arrange
    it('should return null if the request is invalid', async () => {
      const mockUserInfo = {
        name: 'Test User',
        email: 'test@example.com',
        photoURL: 'https://test.com/photo.jpg',
      };

      //Act
      const result = await userService.userLogin({ body: mockUserInfo });

      //Assert
      expect(userRepo.createUser).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return true if successful', async () => {
        //Arrange
      const mockUserID = 'testUserID';
      userRepo.deleteUser.mockResolvedValue(true);

        //Act
      const result = await userService.deleteUser({ params: { userid: mockUserID }, userid: mockUserID });

        //Assert
      expect(userRepo.deleteUser).toHaveBeenCalledWith(mockUserID);
      expect(result).toBe(true);
    });

    it('should return null if the request is invalid', async () => {
        //Arrange
      const mockUserID = 'testUserID';

        //Act
      const result = await userService.deleteUser({ params: { userid: mockUserID }, userid: 'wrongUserID' });

        //Assert
      expect(userRepo.deleteUser).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });

});

const {FileService} = require('../services/file/file.service');
const {FileRepo} = require('../repos/file/file.repo');

jest.mock('../repos/file/file.repo');

describe('FileService', () => {
  let fileService;
  let fileRepo;

  beforeEach(() => {
    fileRepo = new FileRepo();
    fileService = new FileService(fileRepo);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getInfo', () => {
    it('should return file info for a given user ID', async () => {
      // Arrange
      const mockUserID = 'testUserID';
      const mockFileInfo = [
        {
          id: '1',
          filename: 'test1.txt',
          size: 100,
          timestamp: 1618427078860
        },
        {
          id: '2',
          filename: 'test2.txt',
          size: 200,
          timestamp: 1618427088860
        }
      ];

      fileRepo.getInfo.mockResolvedValue(mockFileInfo);

      // Act
      const result = await fileService.getInfo(mockUserID);

      // Assert
      expect(fileRepo.getInfo).toHaveBeenCalledWith(mockUserID);
      expect(result).toEqual(mockFileInfo);
    });
  });

  describe('get', () => {
    it('should return file content for a given user ID and file ID', async () => {
      // Arrange
      const mockUserID = 'testUserID';
      const mockFileID = '1';
      const mockFile = {
        filename: 'test.txt',
        content: 'Hello, World!'
      };

      fileRepo.get.mockResolvedValue(mockFile);

      // Act
      const result = await fileService.get(mockUserID, mockFileID);

      // Assert
      expect(fileRepo.get).toHaveBeenCalledWith(mockUserID, mockFileID);
      expect(result).toEqual(mockFile);
    });
  });

  describe('create', () => {
    it('should create a file and return true if successful', async () => {
      // Arrange
      const mockReq = {
        userid: 'testUserID',
        body: { filename: 'test.txt' },
        files: {
          file: [
            {
              size: 100,
              buffer: Buffer.from('Hello, World!', 'utf-8')
            }
          ]
        }
      };

      fileRepo.create.mockResolvedValue(true);

      // Act
      const result = await fileService.create(mockReq);

      // Assert
      expect(fileRepo.create).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false if the request is invalid', async () => {
      // Arrange
      const mockReq = {
        body: { filename: 'test.txt' },
        files: {
          file: [
            {
              size: 100,
              buffer: Buffer.from('Hello, World!', 'utf-8')
            }
          ]
        }
      };

      // Act
      const result = await fileService.create(mockReq);

      // Assert
      expect(fileRepo.create).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
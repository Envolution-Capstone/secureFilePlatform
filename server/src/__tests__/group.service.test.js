const { GroupService } = require('../services/group/group.service');
const { GroupRepo } = require('../repos/group/group.repo');
const { UserRepo } = require('../repos/user/user.repo');
const { FileRepo } = require('../repos/file/file.repo');

jest.mock('../repos/group/group.repo');
jest.mock('../repos/user/user.repo');
jest.mock('../repos/file/file.repo');

describe('GroupService', () => {
    let groupService;
  
    beforeEach(() => {
      groupService = new GroupService();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getInfo', () => {
      it('should return group information if user is a member', async () => {
        const req = {
          params: { groupid: 'test-group-id' },
          userid: 'test-user-id'
        };

        const groupInfo = {
            id: 'test-group-id',
            name: 'Test Group',
            members: [
              {
                id: 'test-user-id',
                role: 'member'
              },
              {
                id: 'another-user-id',
                role: 'member'
              }
            ]
          };
          
        GroupRepo.prototype.getInfo = jest.fn().mockResolvedValue(groupInfo);
        groupService.test_require_IsMember = jest.fn().mockResolvedValue(true);
  
        const result = await groupService.getInfo(req);
        expect(result).toEqual(groupInfo);
      });
  
      it('should return null if user is not a member', async () => {
        const req = {
          params: { groupid: 'test-group-id' },
          userid: 'non-member-user-id'
        };
      
        groupService.test_require_IsMember = jest.fn().mockResolvedValue(false);
      
        const result = await groupService.getInfo(req);
        expect(result).toBeNull();
      });
      
    });
  
  });
  
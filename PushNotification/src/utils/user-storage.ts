import { UserRepository } from '../repositories';
import {DbDataSource} from '../datasources';
export class UserStorage {
  private static instance: UserStorage;

  private constructor(
    private userRepo: UserRepository,
  ) {}

  public static getInstance(): UserStorage {
    if (!UserStorage.instance) {
      const dataSource = new DbDataSource();
      UserStorage.instance = new UserStorage(
         new UserRepository(dataSource),
      );
    }
    return UserStorage.instance;
  }

  public async createUser(userId: number, orgId: number, role: string, isActive: boolean) {
    try{
        console.log("inside create user");
        console.log(await this.userRepo.find());
        // this.userRepo.
        const instance = await this.userRepo.findOne({
        where: { userId },
        });
        console.log("instance",instance);
        if (instance) {
        throw new Error('User already exists');
        }
        else {
        await UserStorage.instance.userRepo.create({
            userId, orgId, role,isActive
        });
        }}
        catch(err){
          console.log(err);
            throw new Error(err);
        }
  }

  //delete user from a particular org
  public async deleteUserFromOrg(userId: number, orgId: number) {
    const instance = await this.userRepo.findOne({
      where: { userId, orgId },
    });
    if (instance) {
      await UserStorage.instance.userRepo.delete(instance);
    }
    else {
      throw new Error('User does not exists');
    }
  }

    //delete user from all orgs
    public async deleteUserFromExistence(userId: number) {
        const instances = await this.userRepo.find({
          where: { userId },
        });
        for (const instance of instances) {
          await UserStorage.instance.userRepo.delete(instance);
        }
    }

    /**
     * Toggle user's active status in an organization
     *
     * @param userId User identifier, of type number
     * @param orgId Organization identifier, of type number
     * @param isActive Active status for the associated organization
     */
    public async toggleUserOrgNotifications(userId: number, orgId: number, isActive: boolean) {
        const instance = await this.userRepo.findOne({
          where: { userId, orgId },
        });
        if (instance) {
          instance.isActive = isActive;
          await UserStorage.instance.userRepo.update(instance);
        }
        else {
          throw new Error('User association with organization does not exist.');
        }
    }
}
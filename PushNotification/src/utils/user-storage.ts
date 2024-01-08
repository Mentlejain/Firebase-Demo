import { UserRepository } from '../repositories';
import {DbDataSource} from '../datasources';
import { inject } from '@loopback/core';
import * as admin from 'firebase-admin';
export class UserStorage {
  private static instance: UserStorage;
  @inject('firebaseAdmin') private firebaseAdmin: admin.app.App
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

  /**
   * 
   * @param userId  User identifier, of type number
   * @param orgId  Organization identifier, of type number
   * @param role  Role of the user in the organization, of type string
   * @param isActive  Notification status for the associated organization, of type boolean
   */
  public async createUser(userId: number, orgId: number, role: string, isActive: boolean=true) {
    try{
          const instance = await this.userRepo.findOne({
          where: { userId },
        });
          if (instance) {
          throw new Error('User already exists');
          }
          else {
            await UserStorage.instance.userRepo.create({ userId, orgId, role,isActive});
          }
      }
        catch(err){
          console.log(err);
            throw new Error(err);
        }
  }
  /**
   * Delete user from an organization
   * 
   * @param userId User identifier, of type number
   * @param orgId Organization identifier, of type number
   */
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
    /**
     * Delete user from all organizations
     * @param userId User identifier, of type number
     * 
    */
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
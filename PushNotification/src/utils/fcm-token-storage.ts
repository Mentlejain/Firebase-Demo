import { FcmTokenRepository } from '../repositories'; // Import your FcmToken repository
import {DbDataSource} from '../datasources';
export class FcmTokenStorage {
  private static instance: FcmTokenStorage;

  private constructor(
    private fcmTokenRepo: FcmTokenRepository,
  ) {}

  public static getInstance(): FcmTokenStorage {
    if (!FcmTokenStorage.instance) {
      const dataSource = new DbDataSource();
      FcmTokenStorage.instance = new FcmTokenStorage(
        new FcmTokenRepository(dataSource),
      );
    }
    return FcmTokenStorage.instance;
  }

  public static async updateFcmToken(userId: number, fcmToken: string) {
    const instance = await FcmTokenStorage.instance.fcmTokenRepo.findOne({
      where: { userId, fcmToken },
    });
    if (instance) {
      instance.timestamp = new Date();
      instance.fcmToken = fcmToken;
      await FcmTokenStorage.instance.fcmTokenRepo.update(instance);
    }
    else {
      await FcmTokenStorage.instance.fcmTokenRepo.create({
        userId,
        fcmToken,
        timestamp: new Date(),
      });
    }
  }

  public static async getUserFcmTokens(userId: number) {
    const instances = await FcmTokenStorage.instance.fcmTokenRepo.find({
      where: { userId },
    });
    return instances.map((instance) => instance.fcmToken);
  }
}
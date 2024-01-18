import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { FcmTokenRepository } from '../repositories'; // Import the new TokenMapRepository
import { FcmTokenMap } from '../models'; // Import the new TokenMap model

export class FcmTokenManagement {
  private static instance: FcmTokenManagement;

  private constructor(
    private fcmTokenRepo: FcmTokenRepository, // Add the new TokenMapRepository as a dependency
  ) {}

  public static getInstance(): FcmTokenManagement {
    if (!FcmTokenManagement.instance) {
      const dataSource = new DbDataSource();
      FcmTokenManagement.instance = new FcmTokenManagement(
        new FcmTokenRepository(dataSource), // Create a new instance of TokenMapRepository
      );
    }
    return FcmTokenManagement.instance;
  }

  public static async updateFcmToken(userId: string, fcmToken: string) {
    const instance = await FcmTokenManagement.instance.fcmTokenRepo.findOne({
      where: { userId, fcmToken },
    });
    if (instance) {
      instance.timestamp = new Date();
      instance.fcmToken = fcmToken;
      await FcmTokenManagement.instance.fcmTokenRepo.update(instance);
    } else {
      await FcmTokenManagement.instance.fcmTokenRepo.create({
        userId,
        fcmToken,
        timestamp: new Date(),
      });
    }
  }

  public static async deleteFcmToken(fcmToken: string) {
    const instance = await FcmTokenManagement.instance.fcmTokenRepo.findOne({
      where: { fcmToken },
    });
    if (instance) {
      await FcmTokenManagement.instance.fcmTokenRepo.delete(instance);
    } else {
      throw new Error('FcmToken does not exist');
    }
  }

  public static async getUserFcmTokens(userId: string) {
    const instances = await FcmTokenManagement.instance.fcmTokenRepo.find({
      where: { userId },
    });
    return instances.map((instance) => instance.fcmToken);
  }
}

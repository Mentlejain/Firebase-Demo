import * as fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

interface FcmTokenData {
  fcmToken: string;
  orgid: string;
  userid: string;
  role: string;
}

export class FcmTokenStorage {
  private static instance: FcmTokenStorage;
  private readonly filePath: string = './src/repositories/token.json';

  private constructor(private lastActiveUser: any) {}

  static getInstance(lastActiveUser: any): FcmTokenStorage {
    if (!FcmTokenStorage.instance) {
      FcmTokenStorage.instance = new FcmTokenStorage(lastActiveUser);
    }
    return FcmTokenStorage.instance;
  }

  async storeFcmToken(tokenData: FcmTokenData): Promise<void> {
    try {
      let existingData: FcmTokenData[] = [];

      // Read existing data if the file already exists
      if (fs.existsSync(this.filePath)) {
        const fileContent = await readFileAsync(this.filePath, 'utf-8');

        // Handle the case where the file is empty or doesn't contain valid JSON
        existingData = fileContent ? JSON.parse(fileContent) : [];
      }

      // Find the index of the existing entry by fcmToken
      const index = existingData.findIndex(
        entry => entry.fcmToken === tokenData.fcmToken
      );

      if (index !== -1) {
        // Update orgid, userid, and role for the same fcmtoken
        existingData[index].orgid = tokenData.orgid;
        existingData[index].userid = tokenData.userid;
        existingData[index].role = tokenData.role;
        console.log('Updated credentials associated with the token');
      } else {
        // Append the new token data
        existingData.push(tokenData);
      }

      // Write the updated data to the JSON file
      await writeFileAsync(this.filePath, JSON.stringify(existingData, null, 2), 'utf-8');

      this.lastActiveUser[tokenData.fcmToken] = {
        orgid: tokenData.orgid,
        userid: tokenData.userid,
        role: tokenData.role
      };

    } catch (error) {
      console.error('Failed to store fcm token:', error);
    }
  }
}

export { FcmTokenData };

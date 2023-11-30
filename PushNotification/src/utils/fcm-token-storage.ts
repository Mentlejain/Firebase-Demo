// src/utils/fcm-token-storage.ts
export class FcmTokenStorage {
    private static instance: FcmTokenStorage;
    private tokens: Set<string>;
  
    private constructor() {
      this.tokens = new Set<string>();
    }
  
    static getInstance(): FcmTokenStorage {
      if (!FcmTokenStorage.instance) {
        FcmTokenStorage.instance = new FcmTokenStorage();
      }
      return FcmTokenStorage.instance;
    }
  
    addToken(token: string): void {
      this.tokens.add(token);
    }
  
    removeToken(token: string): void {
      this.tokens.delete(token);
    }
  
    getTokens(): string[] {
      return Array.from(this.tokens);
    }
  }
  
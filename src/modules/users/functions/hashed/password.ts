import { compareSync, hashSync } from 'bcryptjs';

export class HashPassword {
    public static encryptPassword(password: string): string {
      return hashSync(password, 10);
    };
    public static verifyPassword(password: string, hash: string): boolean {
      return compareSync(password, hash);
    };
};
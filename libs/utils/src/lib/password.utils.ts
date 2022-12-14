import * as bcrypt from 'bcrypt';

export class PasswordUtils {
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  static async compare(
    storedPassword: string,
    providedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(providedPassword, storedPassword);
  }
}

import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

export class Storage {
  private static _passPhrase = environment.passPhrase;

  private static _storageEnvironemnt = !environment.production
    ? localStorage
    : sessionStorage;

  public static encrypt(txt: string): string {
    if (Storage._passPhrase)
      return CryptoJS.AES.encrypt(txt, Storage._passPhrase).toString();

    throw new Error('Passphrase is not defined');
  }

  public static decrypt(txtToDecrypt: string): string {
    if (Storage._passPhrase)
      return CryptoJS.AES.decrypt(txtToDecrypt, Storage._passPhrase).toString(
        CryptoJS.enc.Utf8
      );

    throw new Error('Passphrase is not defined');
  }

  static set(key: string, value: string): void {
    Storage._storageEnvironemnt.setItem(key, value);
  }

  static get(key: string): string | null {
    const item = Storage._storageEnvironemnt.getItem(key);

    if (!item) return null;

    return Storage.decrypt(item);
  }

  static remove(key: string): void {
    Storage._storageEnvironemnt.removeItem(key);
  }

  static clear(): void {
    Storage._storageEnvironemnt.clear();
  }
}

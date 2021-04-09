import Cookies from 'js-cookie'
class CookieStorage implements Storage {
  clear(): void {
    Object.keys(Cookies.get()).forEach(element => this.removeItem(element));
  }
  getItem(key: string): string | null {
    return Cookies.get(key) || null;
  }
  key(index: number): string | null {
    return Object.keys(Cookies.get())[index];
  }
  removeItem(key: string): void {
    Cookies.remove(key);
  }
  setItem(key: string, value: string): void {
    Cookies.set(key, value);
  }
  get length() {
    return Object.keys(Cookies.get()).length;
  }
}

export default new CookieStorage;

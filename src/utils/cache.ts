class WebCache<T> {
  storage: Storage
  length: number
  constructor(s?: Storage) {
    this.storage = s || localStorage;
    this.length = this.storage.length;
  }
  clear(): void {
    this.storage.clear();
  }
  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }
  getJSON(key: string): T | null {
    try {
      return JSON.parse(this.storage.getItem(key) || '');
    } catch {
      return null;
    }
  }
  key(index: number): string | null {
    return this.storage.key(index);
  }
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
  setJSON(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }
}

export { WebCache }
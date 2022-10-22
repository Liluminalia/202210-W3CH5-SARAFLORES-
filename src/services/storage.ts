export class pokemon<T> {
  constructor(public store: string) {}

  getStore(): Array<T> {
    const dataString = localStorage.getItem(this.store);
    if (!dataString) return [];
    return JSON.parse(dataString);
  }

  setStore(data: Array<T>) {
    localStorage.setItem(this.store, JSON.stringify(data));
  }
}

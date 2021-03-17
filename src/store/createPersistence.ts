import { persistence, StorageAdapter } from 'mobx-persist-store';

function readStore(name: string): Promise<string | undefined> {
  return new Promise(resolve => {
    const data = localStorage.getItem(name);
    resolve(<string | undefined>data);
  });
}

function writeStore(name: string, content: string) {
  return new Promise<void>(resolve => {
    localStorage.setItem(name, content);
    resolve();
  });
}

export default function createPersistence<T>(
  target: T,
  { name, properties }: { name: string; properties: string[] },
): T {
  return persistence({
    name,
    properties,
    adapter: new StorageAdapter({
      read: readStore,
      write: writeStore,
    }),
  })(target);
}

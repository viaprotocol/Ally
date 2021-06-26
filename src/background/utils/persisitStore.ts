/* eslint-disable @typescript-eslint/ban-types */
import { storage } from 'background/webapi';
import { debounce } from 'debounce';

const persistStorage = (name: string, obj: object) => {
  debounce(storage.set(name, obj), 1000);
};

interface CreatePersistStoreParams<T> {
  name: string;
  template?: T;
  fromStorage?: boolean;
}

const createPersistStore = async <T extends object>({
  name,
  template = Object.create(null),
  fromStorage = true,
}: CreatePersistStoreParams<T>): Promise<T> => {
  let tpl = template;

  if (fromStorage) {
    const storageCache = await storage.get(name);
    tpl = storageCache || template;
    if (!storageCache) {
      await storage.set(name, tpl);
    }
  }

  const createProxy = <A extends object>(obj: A, cacheProxy = new Map()): A => {
    return new Proxy(obj, {
      get(target, prop) {
        const oldValue = target[prop];
        if (
          ['[object Object]', '[object Array]'].indexOf(
            Object.prototype.toString.call(oldValue)
          ) > -1
        ) {
          return cacheProxy[oldValue] || createProxy(oldValue, cacheProxy);
        }

        return oldValue;
      },
      set(target, prop, value) {
        target[prop] = value;
        persistStorage(name, target);

        return true;
      },

      deleteProperty(target, prop) {
        if (Reflect.has(target, prop)) {
          Reflect.deleteProperty(target, prop);
          persistStorage(name, target);
        }

        return true;
      },
    });
  };

  return createProxy<T>(tpl);
};

export default createPersistStore;

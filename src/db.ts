import { ICountry } from './country.interface';

let db: IDBDatabase;
let version = 1;
export const DB_NAME = 'country';

export const initializeIndexedDb = () => {
  return new Promise((resolve, _reject) => {
    let request = indexedDB.open(DB_NAME);

    request.onupgradeneeded = () => {
      db = request.result;
      if (!db.objectStoreNames.contains(DB_NAME)) {
        db.createObjectStore(DB_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addDataToStore = (storeName: string, data: ICountry[]) => {
  return new Promise((resolve) => {
    let request = indexedDB.open(DB_NAME, version);

    request.onsuccess = () => {
      db = request.result;
      const trx = db.transaction(storeName, 'readwrite');
      const store = trx.objectStore(storeName);
      data.forEach((record) => {
        store.add({ id: record.code, ...record });
      });
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

export const getAllStoreData = (storeName: string): Promise<ICountry[]> => {
  return new Promise((resolve) => {
    let request = indexedDB.open(DB_NAME);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const getStoreRecord = (storeName: string, id: string) => {
  return new Promise((resolve) => {
    let request = indexedDB.open(DB_NAME);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.get(id);
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

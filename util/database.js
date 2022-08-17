// import everything as sqlite get access to sqlite features
import * as SQLite from 'expo-sqlite';

// creating database
// sqlite will create it for us if it does not exist
// if it does exist and app restarts it will open db
const database = SQLite.openDatabase('places.db');

// util functions that interact w/ db
export function init() {
  const promise = new Promise((resolve, reject) => {
    //db object has transaction method that will execute a query
    // wants a func as a argument
    database.transaction(tx => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        // calback funcs
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

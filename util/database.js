// import everything as sqlite get access to sqlite features
import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

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

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `INSERT INTO places ( title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          // console.log(result);
          // empty array to store places
          const places = [];

          // running thu all data points of drilled down result -> rows -> array
          // then push into places
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          const dbPlace = result.rows._array[0];
          // tranforming place data we get from database (which is diff) into
          // object that has shape defined by our place blueprint
          // fixing undefined error in place tails map
          const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            {
              lat: dbPlace.lat,
              lng: dbPlace.lng,
              address: dbPlace.address,
            },
            dbPlace.id
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

import Datastore from './modules/nedb';
import { syncNedb, modelDb } from './modules/modelNeDb';


export const ordersDb = modelDb(syncNedb(new Datastore({
    filename: 'db/ordersDb',
    autoload: true
}), 10));

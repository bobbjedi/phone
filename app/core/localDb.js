// import Datastore from './modules/nedb';
import './modules/nedb';
const Datastore = window.Nedb;
import {syncNedb, modelDb} from './modules/modelNeDb';

export default modelDb(syncNedb(new Datastore({
    filename: 'db/itemsDb',
    autoload: true
}), 10));
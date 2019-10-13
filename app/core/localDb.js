import Datastore from './modules/nedb';
import {syncNedb, modelDb} from './modules/modelNeDb';


// export default syncNedb(new Datastore({
//     filename: 'db/items',
//     autoload: true
// }));

export default modelDb(syncNedb(new Datastore({
    filename: 'db/itemsDb',
    autoload: true
}), 10));
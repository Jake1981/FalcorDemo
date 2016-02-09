import Promise from 'bluebird';
import developers from './developers';
import projects from './projects';
import config from '../config';
import Datastore from 'nedb';
import path from 'path';

Promise.promisifyAll(Datastore.prototype);

const services = {
    'developers' : developers,
    'projects': projects
};

function create(key) {
    const Service = services[key];
    if (Service === undefined) throw error('service not found');
    const db = new Datastore({ filename: path.join(config.dbDir, `${key}.db`), autoload: true });
    return new Service(db)
}

export default { create : create };
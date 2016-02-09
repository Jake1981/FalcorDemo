class DeveloperService {

    constructor(db) {
        this.db = db;
    }

    getDeveloperById(id) {
        return this.db.findOneAsync({id});
    }

    getDevelopersById(idRange) {
        return this.db.findAsync({ id : { $in: idRange }});
    }
}

export default DeveloperService;
import Promise from 'bluebird';
const allPredicate = {};

class ProjectService {

    constructor(db) {
        this.db = db;
    }

    all() {
        return this.db.findAsync(allPredicate);
    }

    getProjectsByRange(range = { from: 0, to : 9 }, sort = { startDate: 1 }) {

        return new Promise((resolver, reject) => {
            this.db.find(allPredicate)
                .sort(sort)
                .skip(range.from)
                .limit(range.to).exec((err, docs) => {
                    if (err) reject(err);
                    resolver(docs);
                });
        });
    }

    getProjectsByRanges(ranges = [{ from: 0, to: 9 }], sort = { startDate: 1 }) {
        let rangeQueries = {};
        ranges.forEach((range) => {
            const key = `{"from":${range.from},"to":${range.to}}`;
            rangeQueries[key] = this.getProjectsByRange(range, sort);
        });

        return Promise.props(rangeQueries);
    }

    getProjectByIds(idRange) {
        return this.db.findAsync({ id : { $in: idRange }});
    }
}

export default ProjectService;

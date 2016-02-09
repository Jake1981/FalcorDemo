'use strict';

import ServiceFactory from '../services/serviceFactory';
import config from '../config';
import _ from 'lodash';
import falcor from 'falcor';
import projectTransformer from '../transformers/project';

const projectSvc = ServiceFactory.create('projects');

const { ref: $ref, atom : $atom, error: $error } = falcor.Model;

const routes = {
    "getProjectsById[{keys:ids}][{keys:props}]" : getProjectsById,
    "projects[{integers:indices}][{keys:props}]" : getProjectsByRanges
};

export default routes;

function convertToRange(indices) {
    let range = {};
    range.from = indices[0];
    range.to = indices[indices.length -1];
    if (range.from === range.to) range.to++;
    return range;
}

function getProjectsByRanges(pathSet) {

    let range = convertToRange(pathSet.indices);

    return projectSvc.getProjectsByRange(range)
        .then((projects) => {

            let results = [];
            projects.forEach((project, index) => {
                    let link = $ref(['getProjectsById', project.id]);
                    /*
                       // Having to manually load into the cache the project
                       results.push({
                        path: ['getProjectsById', project.id],
                        value: projectTransformer(project, pathSet.props)
                    });*/
                    results.push({path: ['projects', index], value: link});
            });

            return results;
        });
}

function getProjectsById(pathSet) {
    return projectSvc.getProjectByIds(pathSet.ids)
        .then((projects) => {
            return projects.map((project) => {
                let dto = _.pick(project, pathSet.props);
                return { path: ['getProjectsById', project.id], value: dto }
            });
        });
}
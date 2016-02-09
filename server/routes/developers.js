'use strict';

import ServiceFactory from '../services/serviceFactory';
import _ from 'lodash';
import config from '../config';
import falcor from 'falcor';

const { ref: $ref, atom : $atom } = falcor.Model;
const developerSvc = ServiceFactory.create('developers');

const routes = {
    "getDevelopersById[{keys:ids}][{keys:props}]": getDevelopersById
};

export default routes;

function getDevelopersById(pathSet) {

    return developerSvc.getDevelopersById(pathSet.ids).then((developerList) => {
        let developerDtos = _.map(developerList, (developer) => {
            let devDto = _.pick(developer, _.concat(pathSet.props, 'id'));
            if (devDto['skills']) {
                devDto.skills = $atom(devDto.skills); // send all skills back
            }
            return devDto;
        });

        let results = pathSet.ids.map((id) => {
            return {path: ['getDeveloperById', id], value: _.find(developerDtos, {id})};
        });

        return results;
    });
}
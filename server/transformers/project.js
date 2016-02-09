'use strict';

import falcor from 'falcor';
import _ from 'lodash';

const { ref: $ref, atom : $atom, error: $error } = falcor.Model;

function transformProject(project, props) {

    let dto = _.pick(project, props);
    let devList = dto['developers'];
    if (devList && devList.length > 0) {
        dto.developers = devList.map((dev) => {
            return $ref(['getDeveloperById', dev]);
        });
    }

    return dto;
}

export default transformProject;
'use strict';

import _ from 'lodash';
import developerRoutes from './developers';
import projectRoutes from './projects';

var routes = _.merge(developerRoutes, projectRoutes);

export default Object.keys(routes).map((route) => {
    return { 'route' : route, get: routes[route]}
});
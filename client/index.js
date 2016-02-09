'use strict';
import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

const model = new falcor.Model({
        source: new HttpDataSource('/model.json')
});

model.get(['projects', 0, ['id', 'name']]).then((results) => {
        console.log('projects', results);
});
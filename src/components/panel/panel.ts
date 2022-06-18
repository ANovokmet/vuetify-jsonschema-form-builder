import DefaultOptions from '../common/DefaultOptions.vue';
import { buildDefaultProps, buildRequiredProp } from '../common/utils';
import Panel from './Panel.vue';

export default {
    title: 'Panel',
    icon: 'table_rows',
    settings: {
        type: 'panel',
        key: 'panel',
        label: 'Panel',
        xCols: 12,
        components: []
    },
    optionsTemplate: DefaultOptions,
    template: Panel,
    buildSchema: (settings: any, parent: any, builder: any) => {

        const schema = {
            ...buildDefaultProps(settings),
            type: 'object'
        };

        parent.properties[settings.key] = schema; 

        for (const component of settings.components) {
            builder.buildSchema(component, schema);
        }
        
        buildRequiredProp(settings, parent);
    }
};
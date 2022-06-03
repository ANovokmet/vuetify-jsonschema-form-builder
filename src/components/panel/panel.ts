import PanelOptions from './PanelOptions.vue';
import Panel from './Panel.vue';

export default {
    title: 'Panel',
    icon: 'mdi-grid',
    settings: {
        type: 'panel',
        key: 'panel',
        label: 'Panel',
        xCols: 12,
        components: []
    },
    optionsTemplate: PanelOptions,
    template: Panel,
    buildSchema: (settings: any, parent: any, builder: any) => {

        const schema = {
            type: 'object',
            title: settings.label,
            'x-cols': +settings.xCols,
            properties: {},
        };

        parent.properties[settings.key] = schema; 

        for (const component of settings.components) {
            builder.buildSchema(component, schema);
        }
    }
};
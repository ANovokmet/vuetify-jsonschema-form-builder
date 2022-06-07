import DefaultOptions from '../common/DefaultOptions.vue';
import DefaultField from '../common/DefaultField.vue';

export default {
    title: 'Time',
    icon: 'schedule',
    settings: {
        type: 'time',
        key: 'time',
        label: 'Time',
        xCols: 12,
    },
    optionsTemplate: DefaultOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            type: 'string',
            format: 'time',
            title: settings.label,
            'x-cols': +settings.xCols
        }
    }
};
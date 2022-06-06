import DateOptions from './DateOptions.vue';
import DefaultField from '../common/DefaultField.vue';

export default {
    title: 'Date',
    icon: 'calendar_today',
    settings: {
        type: 'date',
        key: 'date',
        label: 'Date',
        xCols: 12,
    },
    optionsTemplate: DateOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            type: 'string',
            format: 'date',
            title: settings.label,
            'x-cols': +settings.xCols
        }
    }
};
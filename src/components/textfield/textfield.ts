import DefaultOptions from '../common/DefaultOptions.vue';
import DefaultField from '../common/DefaultField.vue';

export default {
    title: 'Short text',
    icon: 'text_fields',
    settings: {
        type: 'textfield',
        key: 'textfield',
        label: 'Short text',
        xCols: 12,
    },
    optionsTemplate: DefaultOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            type: 'string',
            title: settings.label,
            'x-cols': +settings.xCols
        }
    }
};
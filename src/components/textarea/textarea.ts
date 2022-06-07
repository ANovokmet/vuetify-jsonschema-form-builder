import DefaultOptions from '../common/DefaultOptions.vue';
import DefaultField from '../common/DefaultField.vue';

export default {
    title: 'Long text',
    icon: 'text_fields',
    settings: {
        type: 'textarea',
        key: 'textarea',
        label: 'Long text',
        xCols: 12,
    },
    optionsTemplate: DefaultOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            type: 'string',
            title: settings.label,
            'x-display': "textarea",
            'x-cols': +settings.xCols
        }
    }
};
import DefaultOptions from '../common/DefaultOptions.vue';
import DefaultField from '../common/DefaultField.vue';
import { buildDefaultProps, buildPadding, buildRequiredProp } from '../common/utils';

export default {
    title: 'Long text',
    icon: 'text_fields',
    settings: {
        type: 'textarea',
        key: 'textarea',
        label: 'Long text',
        xCols: 12,
        required: false,
        readOnly: false,
        padding: {},
    },
    optionsTemplate: DefaultOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            ...buildDefaultProps(settings),
            type: 'string',
            'x-display': "textarea",
        };
        buildRequiredProp(settings, parent);
        buildPadding(settings, parent.properties[settings.key]);
    }
};
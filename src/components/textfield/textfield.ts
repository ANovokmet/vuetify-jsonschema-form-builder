import DefaultOptions from '../common/DefaultOptions.vue';
import DefaultField from '../common/DefaultField.vue';
import { buildDefaultProps, buildRequiredProp } from '../common/utils';

export default {
    title: 'Short text',
    icon: 'text_fields',
    settings: {
        type: 'textfield',
        key: 'textfield',
        label: 'Short text',
        xCols: 12,
        required: false,
        readOnly: false,
    },
    optionsTemplate: DefaultOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            ...buildDefaultProps(settings),
            type: 'string'
        }
        buildRequiredProp(settings, parent);
    }
};
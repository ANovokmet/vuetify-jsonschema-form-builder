import SelectOptions from './SelectOptions.vue';
import DefaultField from '../common/DefaultField.vue';
import { buildDefaultProps, buildRequiredProp } from '../common/utils';

export default {
    title: 'Dropdown',
    icon: 'format_list_bulleted',
    settings: {
        type: 'select',
        key: 'select',
        label: 'Dropdown',
        xCols: 12,
        required: false,
        readOnly: false,
        values: []
    },
    optionsTemplate: SelectOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            ...buildDefaultProps(settings),
            type: 'string',
            oneOf: settings.values.map((option: any) => ({
                const: option.value,
                title: option.label
            }))
        }
        buildRequiredProp(settings, parent);
    }
};
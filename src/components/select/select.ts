import SelectOptions from './SelectOptions.vue';
import DefaultField from '../common/DefaultField.vue';

export default {
    title: 'Dropdown',
    icon: 'format_list_bulleted',
    settings: {
        type: 'select',
        key: 'select',
        label: 'Dropdown',
        xCols: 12,
        values: []
    },
    optionsTemplate: SelectOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            type: 'string',
            title: settings.label,
            'x-cols': +settings.xCols,
            oneOf: settings.values.map((option: any) => ({
                const: option.value,
                title: option.label
            }))
        }
    }
};
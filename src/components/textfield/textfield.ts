import TextFieldOptions from './TextfieldOptions.vue';
import DefaultField from '../common/DefaultField.vue';

export default {
    title: 'Text field',
    icon: 'title',
    settings: {
        type: 'textfield',
        key: 'textfield',
        label: 'Text field',
        xCols: 12,
    },
    optionsTemplate: TextFieldOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            type: 'string',
            title: settings.label,
            'x-cols': +settings.xCols
        }
    }
};
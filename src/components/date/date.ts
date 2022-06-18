import DefaultOptions from '../common/DefaultOptions.vue';
import DefaultField from '../common/DefaultField.vue';
import { buildDefaultProps, buildRequiredProp } from '../common/utils';

export default {
    title: 'Date',
    icon: 'calendar_today',
    settings: {
        type: 'date',
        key: 'date',
        label: 'Date',
        xCols: 12,
        required: false,
        readOnly: false,
    },
    optionsTemplate: DefaultOptions,
    template: DefaultField,
    buildSchema: (settings: any, parent: any) => {
        parent.properties[settings.key] = {
            ...buildDefaultProps(settings),
            type: 'string',
            format: 'date',
        }

        buildRequiredProp(settings, parent);
    }
};
import DefaultOptions from '../common/DefaultOptions.vue';
import DefaultField from '../common/DefaultField.vue';
import { buildDefaultProps, buildRequiredProp } from '../common/utils';

export default {
    title: 'Time',
    icon: 'schedule',
    settings: {
        type: 'time',
        key: 'time',
        label: 'Time',
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
            format: 'time',
        }
        buildRequiredProp(settings, parent);
    }
};
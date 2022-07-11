import SelectOptions from './SelectOptions.vue';
import DefaultField from '../common/DefaultField.vue';
import { buildDefaultProps, buildPadding, buildRequiredProp, IJsonSchema, IJsonSchemaProperty, ISettings } from '../common/utils';
import { SchemaBuilder } from '../schema-builder';
import { IComponentDefinition } from '../interfaces';

export interface ISelectSettings extends ISettings {
    source: 'values' | 'predefined';
    values?: { value: string; label: string; }[];
    predefinedSelectId?: string;
}

export interface IJsonSchemaSelectProperty extends IJsonSchemaProperty {
    oneOf?: { const: string; title: string; }[];
    'x-predefinedSelectId'?: string;
    'x-fromUrl'?: string;
    'x-itemsProp'?: string;
    'x-itemTitle'?: string;
    'x-itemKey'?: string;
}

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
        padding: {},
        source: 'values',
        values: [],
    },
    optionsTemplate: SelectOptions,
    template: DefaultField,
    buildSchema: (settings: ISelectSettings, parent: IJsonSchema, builder: SchemaBuilder) => {

        const config: IJsonSchemaSelectProperty =  {
            ...buildDefaultProps(settings),
            type: 'string',
        }

        if(settings.source === 'values' && settings.values) {
            config.oneOf = settings.values.map((option) => ({
                const: option.value,
                title: option.label
            }));
        }

        if(settings.source === 'predefined' && settings.predefinedSelectId && builder.context.predefinedSelects) {
            config['x-predefinedSelectId'] = settings.predefinedSelectId;
            const predefinedSelect = builder.context.predefinedSelects.find(select => select.id === settings.predefinedSelectId);
            if(predefinedSelect) {
                config['x-fromUrl'] = predefinedSelect.url;
                if(predefinedSelect.itemsProp) {
                    config['x-itemsProp'] = predefinedSelect.itemsProp;
                }
                config['x-itemTitle'] = predefinedSelect.itemTitle;
                config['x-itemKey'] = predefinedSelect.itemKey;
            }
        }

        parent.properties[settings.key] = config;
        buildRequiredProp(settings, parent);
        buildPadding(settings, config);
    }
} as IComponentDefinition<ISelectSettings>;
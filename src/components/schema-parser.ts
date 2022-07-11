import { IJsonSchema, ISettings } from "./common/utils";
import { ISelectSettings } from "./select/select";

type Settings = ISettings | ISelectSettings;

export class SchemaParser {
    //   {
    //     type: 'object',
    //     properties: {
    //       stringProp: {
    //         type: 'string'
    //       },
    //       colorProp: {
    //         type: 'string',
    //         'x-display': 'color-picker'
    //       },
    //     }
    //   }

    config = [];

    visit(schema: any) {
        if (schema.type === 'object') {
            this.visitObject(schema, this.config);
        }
    }

    visitObject(schema: any, config: any[]) {

        for (const key in schema.properties) {
            const property = schema.properties[key];
            this.visitProperty(property, key, config, schema);
        }

        if (schema.title != null) {
            // console.log(schema);
        }
    }

    visitProperty(property: any, key: string, config: any[], parent: IJsonSchema) {
        if (property.type === 'string') {
            this.visitStringProperty(property, key, config, parent);
        } else if (property.type === 'object') {
            this.visitObjectProperty(property, key, config, parent);
        }
    }

    visitStringProperty(property: any, key: string, config: Settings[], parent: IJsonSchema) {

        const defaultProps: Partial<ISettings> = {
            key: key,
            label: property.title || key,
            xCols: property['x-cols'] !== undefined ? property['x-cols'] : 12,
            defaultValue: property.default,
            tooltip: property.description,
            required: parent.required && parent.required.includes(key),
            readOnly: property.readOnly
        };
        defaultProps.padding = {};

        if (property['x-class']) {
            // pl-0 pt-0 pb-0 pr-0
            const regexp = /\b(pl-(?<left>[0-9]+)|pt-(?<top>[0-9]+)|pb-(?<bottom>[0-9]+)|pr-(?<right>[0-9]+))\b/g;
            let match;
            while ((match = regexp.exec(property['x-class'])) != null) {
                if (match && match.groups) {
                    const { left, top, bottom, right } = match.groups;
                    if (left) {
                        defaultProps.padding.left = +left;
                    }
                    if (top) {
                        defaultProps.padding.top = +top;
                    }
                    if (right) {
                        defaultProps.padding.right = +right;
                    }
                    if (bottom) {
                        defaultProps.padding.bottom = +bottom;
                    }
                }
            }
        }

        if (property.format === 'date') {
            config.push({
                ...defaultProps,
                type: 'date',
            } as ISettings);
        } else if (property.format === 'time') {
            config.push({
                ...defaultProps,
                type: 'time',
            } as ISettings);
        } else if (property['x-display'] === 'textarea') {
            config.push({
                ...defaultProps,
                type: 'textarea',
            } as ISettings);
        } else if (property.oneOf) {
            config.push({
                ...defaultProps,
                type: 'select',
                source: 'values',
                values: property.oneOf.map((item: any) => ({
                    value: item.const,
                    label: item.title
                }))
            } as ISelectSettings);
        } else if (property['x-predefinedSelectId']) {
            config.push({
                ...defaultProps,
                type: 'select',
                source: 'predefined',
                predefinedSelectId: property['x-predefinedSelectId']
            } as ISelectSettings);
        } else {
            config.push({
                ...defaultProps,
                type: 'textfield'
            } as ISettings);
        }
    }

    visitObjectProperty(property: any, key: string, config: any[], parent: IJsonSchema) {
        const components: any[] = [];
        config.push({
            type: 'panel',
            key: key,
            label: property.title || key,
            xCols: property['x-cols'] !== undefined ? property['x-cols'] : 12,
            components
        });

        for (const key in property.properties) {
            const prop = property.properties[key];
            this.visitProperty(prop, key, components, parent);
        }
    }


}
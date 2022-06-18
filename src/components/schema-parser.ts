import { IJsonSchema } from "./common/utils";

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

    visitStringProperty(property: any, key: string, config: any[], parent: IJsonSchema) {

        const defaultProps = {
            key: key,
            label: property.title ?? key,
            xCols: property['x-cols'] ?? 12,
            defaultValue: property.default,
            tooltip: property.description,
            required: parent.required && parent.required.includes(key),
            readOnly: property.readOnly
        };

        if (property.format === 'date') {
            config.push({
                ...defaultProps,
                type: 'date',
            });
        } else if (property.format === 'time') {
            config.push({
                ...defaultProps,
                type: 'time',
            });
        } else if (property['x-display'] === 'textarea') {
            config.push({
                ...defaultProps,
                type: 'textarea',
            });
        } else if (property.oneOf) {
            config.push({
                ...defaultProps,
                type: 'select',
                values: property.oneOf.map((item: any) => ({
                    value: item.const,
                    label: item.title
                }))
            })
        } else {
            config.push({
                ...defaultProps,
                type: 'textfield'
            });
        }
    }

    visitObjectProperty(property: any, key: string, config: any[], parent: IJsonSchema) {
        const components: any[] = [];
        config.push({
            type: 'panel',
            key: key,
            label: property.title ?? key,
            xCols: property['x-cols'] ?? 12,
            components
        });

        for (const key in property.properties) {
            const prop = property.properties[key];
            this.visitProperty(prop, key, components, parent);
        }
    }


}
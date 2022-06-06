export class SchemaParser{
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
        if(schema.type === 'object') {
            this.visitObject(schema, this.config);
        }
    }

    visitObject(schema: any, config: any[]) {

        for (const key in schema.properties) {
            const property = schema.properties[key];
            this.visitProperty(property, key, config);
        }

        if(schema.title != null) {
            // console.log(schema);
        }
    }

    visitProperty(property: any, key: string, config: any[]) {
        if(property.type === 'string') {
            this.visitStringProperty(property, key, config);
        } else if(property.type === 'object') {
            this.visitObjectProperty(property, key, config);
        }
    }

    visitStringProperty(property: any, key: string, config: any[]) {
        if(property.format === 'date') {
            config.push({
                type: 'date',
                key: key,
                label: property.title ?? key,
                xCols: property['x-cols'] ?? 12,
            });
        } else {
            config.push({
                type: 'textfield',
                key: key,
                label: property.title ?? key,
                xCols: property['x-cols'] ?? 12,
            });
        }
    }

    visitObjectProperty(property: any, key: string, config: any[]) {
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
            this.visitProperty(prop, key, components);
        }
    }


}
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


    }


}
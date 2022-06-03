
export class SchemaBuilder {
    components: { [type: string]: any; };

    constructor(components: { [type: string]: any }) {
        this.components = components;
    }

    build(config: any) {

        const schema = {
            type: 'object',
            properties: {}
        }

        console.log("iterating...", config);
        for (const settings of config) {
            this.buildSchema(settings, schema);
        }

        return schema;
    }

    buildSchema(settings: any, parent: any) {
        console.log(settings);
        const cmp = this.components[settings.type];
        if (cmp) {
            cmp.buildSchema(settings, parent, this);
        } else {
            throw new Error(`Unknown component: ${settings.type}`)
        }
    }
}
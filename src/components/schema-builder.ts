import { IFormBuilderContext } from "./interfaces";

export class SchemaBuilder {
    components: { [type: string]: any; };
    context: IFormBuilderContext;

    constructor(components: { [type: string]: any }, context: IFormBuilderContext) {
        this.components = components;
        this.context = context || {};
    }

    build(config: any) {

        const schema = {
            type: 'object',
            properties: {}
        }

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
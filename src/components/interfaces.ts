import { IJsonSchema, ISettings } from "./common/utils";
import { SchemaBuilder } from "./schema-builder";

export interface IPredefinedSelect {
    id: string;
    label: string;
    url: string;
    itemsProp?: string;
    itemTitle: string;
    itemKey: string;
}

export interface IFormBuilderContext {
    predefinedSelects?: IPredefinedSelect[];
}

export interface IComponentDefinition<TSettings extends ISettings> {
    title: string;
    icon: string;
    settings: TSettings;
    optionsTemplate: any;
    template: any;
    buildSchema(settings: TSettings, parent: IJsonSchema, builder: SchemaBuilder): void;
}
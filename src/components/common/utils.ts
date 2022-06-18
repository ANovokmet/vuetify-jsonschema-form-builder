export interface ISettings {
    key: string;
    label?: string;
    xCols: string;
    defaultValue?: string;
    tooltip?: string;
    required?: boolean;
    readOnly?: boolean;
}

export interface IJsonSchema {
    required?: string[];
}

export function buildDefaultProps(settings: ISettings) {
    return {
        title: settings.label,
        'x-cols': +settings.xCols,
        default: settings.defaultValue,
        description: settings.tooltip,
        readOnly: settings.readOnly
    };
}

export function buildRequiredProp(settings: ISettings, parent: IJsonSchema) {
    if(settings.required) {
        if(!parent.required) {
            parent.required = [];
        }
        parent.required.push(settings.key);
    }
}
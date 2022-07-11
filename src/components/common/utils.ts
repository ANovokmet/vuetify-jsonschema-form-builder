export interface ISettings {
    type: string;
    key: string;
    label?: string;
    xCols: number;
    defaultValue?: string;
    tooltip?: string;
    required?: boolean;
    readOnly?: boolean;
    padding?: IPadding
}

interface IPadding {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

export interface IJsonSchema {
    type: 'object';
    required?: string[];
    properties: { [property: string]: IJsonSchemaProperty }
}

export interface IJsonSchemaProperty {
    type: string;
    title?: string;
    description?: string;
    'x-cols'?: number;
    'x-class'?: string;
    default?: any;
    readOnly?: boolean;
}

export function buildDefaultProps(settings: ISettings): Partial<IJsonSchemaProperty> {
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

export function buildPadding(settings: ISettings, properties: IJsonSchemaProperty) {
    
    function setPadding(location: keyof IPadding) {
        if(settings.padding && settings.padding[location] != null) {
            if(!properties['x-class']){
                properties['x-class'] = '';
            }
            properties['x-class'] += ` p${location[0]}-${settings.padding[location]}`;
        }
    }

    if(settings.padding) {
        setPadding('top');
        setPadding('bottom');
        setPadding('left');
        setPadding('right');
    }
}
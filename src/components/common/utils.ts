export interface ISettings {
    key: string;
    label?: string;
    xCols: string;
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

export function buildPadding(settings: ISettings, properties: any) {
    
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
// import textfieldComponent from './textfield/textfield';
// import panelComponent from './panel/panel';
// import dateComponent from './date/date';

export const components: { [type: string]: any } = {
  
};

export function registerComponent(type: string, component: any) {
    components[type] = component;
}

export function getComponent(type: string) {
    return components[type];
}
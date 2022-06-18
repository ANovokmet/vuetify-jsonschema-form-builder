import Vue from 'vue';

export const store = Vue.observable({
    selectedSettings: null,
    selectedDefinition: null,
    onClick: null as any
});
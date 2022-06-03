import Vue from 'vue';

export default Vue.extend({
    methods: {
        onRemove(item: any, config: any[]) {
            debugger;
            const index = config.indexOf(item);
            if(index !== -1) {
                config.splice(index, 1);
            }
        }
    },
});
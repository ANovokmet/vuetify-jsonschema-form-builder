import Vue from 'vue';
import { store } from '../store';

export default Vue.extend({
    methods: {
        onRemove(item: any, config: any[]) {
            const index = config.indexOf(item);
            if(index !== -1) {
                config.splice(index, 1);
                if(store.selectedSettings == item) {
                    store.selectedDefinition = null;
                    store.selectedSettings = null;
                }
            }
        }
    },
});
import Vue from 'vue';

export default Vue.extend({
    methods: {
        /** returns a unique key property */
        uniquify(item: any, items: any[]): string {
            function isUniqueKey(target: any, key: string) {
                for (const cmp of items) {
                    if (cmp != target && cmp.key === key) {
                        return false;
                    }
                }
                return true;
            }

            let key = item.key;
            let i = 1;
            let isUnique = isUniqueKey(item, key);
            while (!isUnique) {
                key = item.key + i;
                isUnique = isUniqueKey(item, key)
                i++;
            }

            return key;
        },

        onDragEnd(item: any, config: any[]) {
            if(item.added) {
                const target = item.added.element;
                target.key = this.uniquify(target, config);
            }
        }
    },
});
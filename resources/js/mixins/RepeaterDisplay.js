export default{

    data: () => ({
        detailVisible: false,
    }),

    computed: {
        value() {
            return (this.field.value)
                ? JSON.parse(this.field.value)
                : [];
        },
        toggleText() {
            return (this.detailVisible)
                ? this.__('Hide detail')
                : this.__('Show detail')
        },
        summaryText() {
            return `${this.summaryTextNumber} ${this.summaryTextLabel}`;
        },
        summaryTextNumber() {

            let value = this.clean;

            return (this.field.value)
                ? value.length
                : 0;
        },
        summaryTextLabel() {
            return (this.field.summary_label)
                ? this.field.summary_label
                : 'rows';
        },
        clean() {

            let value = this.field.value || '';

            try {
                value = JSON.parse(this.field.value);
            } catch (_error) {}


            if(typeof value === 'string'){

                value = value ? value.replace(/\\/g, "") : '';

                if(value.substring(0, 1)==='"'){

                    value = value.replace(/^"(.*)"$/, '$1') || '';

                }

                value = JSON.parse(value);

            }

            return value;

        },
        rows() {

            let value = this.clean;

            return value.map(row => {
                let keys = Object.keys(row);

                return keys.map(key => {
                    let subField = this.field.sub_fields.find(field => field.name === key);
                    let value = (['select'].some(type => type === subField.type))
                        ? subField.options[row[key]]
                        : row[key];
                    return {
                        label: subField.label,
                        value: value
                    }
                });
            })
        }
    },

    methods: {
        toggleDetail() {
            this.detailVisible = !this.detailVisible;
        }
    }

}

// component/bill-daily.ts
import BillData from "../../utils/util";

Component({
    properties: {
        billData: Object,
    },

    data: {
        date: String,
        income: Number,
        expense: Number,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        deleteItem: function(e: any) {
            console.info(this.data.billData);
        },

        setDate: function() {

        }
    },
})
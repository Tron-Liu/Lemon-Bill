// component/bill_item.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    img: {
        type: String,
        value: "../../img/default.png"
    },
    label: {
        type: String,
        value: "餐饮",
    },
    timeStamp: {
        type: String,
        value: "08:08",
    },
    comment: {
        type: String,
        value: "小龙虾",
    },
    account: {
        type: Number,
        value: 100,
    }
  },

  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateDate() {
        this.setData({

        })
    }
  }
})
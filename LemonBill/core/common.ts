export enum AmountType {
    INCOME, // 收入
    OUTGO, // 支出
    BALANCE, // 不统计
  }
  
  export interface BillData {
    timeStamp: Number; // 时间戳
    comment: String; // 用途备注
    book: String; // 账本
    amount: Number; // 金额
    category: String; // 类别
    amountType: AmountType; // 金额类型
  }
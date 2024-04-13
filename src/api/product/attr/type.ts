export interface responseData {
  message: string;
  code: number;
  ok: boolean;
}
export interface CategoryObject {
  id: number|string;
  name: string;
  // ... 其他属性
  category1Id?:number
  category2Id?:number
  category3Id?:number
}

export interface CategoryResponseData extends responseData {
  data: CategoryObject[];
}


// 属性值和属性定义
export type AttrValueList = AttrValue[];
//属性对象
export interface Attr{
    id:number,
    attrName:string,
    categoryId:number,
    categoryLevel: number,
    attrValueList:AttrValueList
}
// 属性值
export interface AttrValue{
  id:number,
  valueName:string,
  attrId:number
}
// 属性接口返回类型
export interface AttrResponseData extends responseData {
  data: Attr[];
}
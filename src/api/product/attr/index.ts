import request from "@/utils/request";
import { AttrResponseData,CategoryResponseData } from "./type";
enum API {
  CATEGORY1_URL = '/admin/product/getCategory1',
  CATEGORY2_URL = '/admin/product/getCategory2',
  CATEGORY3_URL = '/admin/product/getCategory3',
  GET_CATEGORY_CHILDREN_URL = '/admin/product/attrInfoList/',
}
export const reqCategory1 = () => request.get<any,CategoryResponseData>(API.CATEGORY1_URL)
// 获取二级分类的数据需要携带一级分类的id
export const reqCategory2 = (category1Id:number|string) => request.get<any,CategoryResponseData>(API.CATEGORY2_URL+'/'+category1Id)
// 获取三级分类的数据需要携带二级分类的id
export const reqCategory3 = (category2Id:number|string) => request.get<any,CategoryResponseData>(API.CATEGORY3_URL+'/'+category2Id)

// 获取平台全部的商品分类
export const reqGetCategory = (category1Id:number|string,category2Id:number|string,category3Id:number|string) => request.get<any,AttrResponseData>(API.GET_CATEGORY_CHILDREN_URL+`${category1Id}/${category2Id}/${category3Id}`)
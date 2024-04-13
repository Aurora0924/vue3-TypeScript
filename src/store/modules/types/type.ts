import type { RouteRecordRaw } from "vue-router";
import type { CategoryObject } from "@/api/product/attr/type";
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}
// category返回数据类型
export interface CategoryState {
  CategoryList:CategoryObject[],
  CategoryList2:CategoryObject[],
  CategoryList3:CategoryObject[],
  category1Id:number|string,
  category2Id:number|string,
  category3Id:number|string,
}
  
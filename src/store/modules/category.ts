import { defineStore } from "pinia";
import { reqCategory1 ,reqCategory2,reqCategory3} from "@/api/product/attr";
import { CategoryResponseData } from "@/api/product/attr/type";
import { CategoryState } from "./types/type";
export const useCategoryStore = defineStore('Category',{
  state:():CategoryState=>{
      // 定义响应式数据
      return {
        CategoryList:[],
        category1Id:'',
        CategoryList2:[],
        category2Id:'',
        CategoryList3:[],
        category3Id:''
      }
  },
  actions: {
    //获取一级分类数据
   async getCategory1List(){
    let result:CategoryResponseData = await reqCategory1()
      if(result.code == 200){
        this.CategoryList = result.data
      }
    },
    async getCategory2List(){
      let result:CategoryResponseData = await reqCategory2(this.category1Id)
      if(result.code == 200){
        this.CategoryList2 = result.data
      }
    },
    async getCategory3List(){
      let result:CategoryResponseData = await reqCategory3(this.category2Id)
      if(result.code == 200){
        this.CategoryList3 = result.data
      }
    }
  },
  getters: {
    // ...
  }
})
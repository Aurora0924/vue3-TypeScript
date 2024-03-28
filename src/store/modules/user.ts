import {defineStore} from 'pinia'
import { reqLogin } from '@/api/user';
import type {loginFrom} from '@/api/user';
let useUserStore = defineStore('user', {
  state: () => ({
    return:{
      token:localStorage.getItem("token"),
    }
  }),
  //异步
  actions:{
    async userLogin(data:loginFrom){
      let request:any = await reqLogin(data);
      if(request.code === 200){
        //将token信息存储到pinia中
        this.token = request.data.token;
        // 将token本地备份一份目的持久化
        localStorage.setItem('token',request.data.token);
        return 'ok';
      }else {
        return Promise.reject(new Error(request.data.message))
      }
    }
  },
  //getters
  getters:{
    
  }
})

export default useUserStore
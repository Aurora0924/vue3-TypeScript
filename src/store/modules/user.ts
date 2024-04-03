import { defineStore } from "pinia";
import { reqLogin, reqUserInfo ,reqLogout} from "@/api/user";
import type { loginFormData, loginResponseData,userInfoReponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoute } from "@/router/routers";
const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      username: "",
      avatar: "",
    };
  },
  //异步
  actions: {
    async userLogin(data: loginFormData) {
      let request: loginResponseData = await reqLogin(data);
      if (request.code === 200) {
        //将token信息存储到pinia中
        this.token = request.data as string;
        // 将token本地备份一份目的持久化
        SET_TOKEN(request.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(request.data.message));
      }
    },
    async userInfo() {
      let request = await reqUserInfo();
      if (request.code == 200) {
        
        this.username = request.data.name;
        this.avatar = request.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(request.data.message));
      }
    },
    //没有接口不需要用异步
    async logout() {
      let request = await reqLogout();
      if(request.code == 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      }else {
        return Promise.reject(new Error(request.data.message));
      }
     
    },
  },
  //getters
  getters: {},
});

export default useUserStore;

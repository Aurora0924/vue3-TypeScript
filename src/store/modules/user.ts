import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginFormData, loginResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";
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
        this.token = request.data.token as string;
        // 将token本地备份一份目的持久化
        SET_TOKEN(request.data.token as string);
        return "ok";
      } else {
        return Promise.reject(new Error(request.data.message));
      }
    },
    async userInfo() {
      let request = await reqUserInfo();
      if (request.code === 200) {
        this.username = request.data.checkUser.name;
        this.avatar = request.data.checkUser.avatar;
      } else {
      }
    },
  },

  //getters
  getters: {},
});

export default useUserStore;

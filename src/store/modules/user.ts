import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { loginFrom ,loginResponseData} from "@/api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN,GET_TOKEN } from "@/utils/token";
let useUserStore = defineStore("User", {
  state: ():UserState => ({
    return: {
      token: GET_TOKEN(),
    },
  }),
  //异步
  actions: {
    async userLogin(data: loginFrom) {
      let request: loginResponseData = await reqLogin(data);
      if (request.code === 200) {
        //将token信息存储到pinia中
        this.token = (request.data.token as string);
        // 将token本地备份一份目的持久化
       SET_TOKEN(request.data.token as string)
        return "ok";
      } else {
        return Promise.reject(new Error(request.data.message));
      }
    },
  },
  //getters
  getters: {},
});

export default useUserStore;

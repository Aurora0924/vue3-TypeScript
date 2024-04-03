// 全局路由守卫
import router from "@/router";
import pinia from "./store";
import setting from "./setting";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import useUserStore from "./store/modules/user";
import { imageEmits } from "element-plus";
const useStore = useUserStore(pinia);
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title} - ${to.meta.title}`;
  NProgress.start();
  let token = useStore.token;
  const username = useStore.username;
  
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      if (username) {
        next();
      } else {
        try {
          await useStore.userInfo;
          next();
        } catch (error) {
          // token过期
          await useStore.logout();
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
       next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

router.afterEach((to, from) => {
  // 处理页面切换时的逻辑

  NProgress.done();
});

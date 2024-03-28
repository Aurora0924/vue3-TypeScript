// 使用vue-router插件实现路由的配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routers';
 
 const router = createRouter({
  history: createWebHistory(),
  routes:constantRoute,
  // 路由的滚动行为
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})
export default router;
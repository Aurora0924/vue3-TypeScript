import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import gloablComponent from "./components/index";

import "./style/index.scss";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";
import pinia from "./store";
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import router from "./router";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(gloablComponent);
app.use(router);
app.use(pinia);
import "./permission";
app.mount("#app");

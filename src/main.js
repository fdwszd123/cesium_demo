import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "normalize.css";
// highlight 的样式，依赖包，组件
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App);
//注册自定义指令

app.use(router);
//注册组件
app.use(hljsVuePlugin);
app.mount("#app");

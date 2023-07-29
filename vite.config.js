import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import path from "path";
function _resolve(dir) {
  return path.resolve(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })],
      directoryAsNamespace: true,
    }),
  ],
  resolve: {
    alias: {
      "/@": _resolve("src"),
    },
  },
});

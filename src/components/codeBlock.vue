<template>
  <div class="hljs-container" codetype="JavaScript">
    <highlightjs
      language="JavaScript"
      :autodetect="false"
      :code="codeContent"
    ></highlightjs>
  </div>
</template>

<script setup>
import "highlight.js/styles/androidstudio.css";
import { getMethodContent } from "/@/utils/requestMethodContent.js";
import { watch, ref } from "vue";
const codeContent = ref("");
const props = defineProps(["fileName"]);
const emits = defineEmits(["getCode"]);
watch(
  () => props.fileName,
  async (val) => {
    const filePath = `/method/${val}`;
    codeContent.value = await getMethodContent(filePath);
    emits("getCode", codeContent.value);
  },
  { immediate: true }
);
</script>

<style scoped>
/* 语法高亮 */
.hljs-container {
  position: relative;
  display: block;
  padding: 30px 5px 2px;
  overflow-x: hidden;
  line-height: 20px;
  text-align: left;
  background: #21252b;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

/** 3个点 */
.hljs-container::before {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 12px;
  height: 12px;
  overflow: visible;
  font-weight: 700;
  font-size: 16px;
  line-height: 12px;
  white-space: nowrap;
  text-indent: 75px;
  background-color: #fc625d;
  border-radius: 16px;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  content: attr(codetype);
}

/** 滚动条 */
:deep(.hljs) {
  max-height: 400px;
  overflow-x: auto;
  overflow-y: auto;
}

:deep(.hljs::-webkit-scrollbar) {
  width: 12px !important;
  height: 12px !important;
}

:deep(.hljs::-webkit-scrollbar-thumb) {
  height: 30px !important;
  background: #d1d8e6;
  background-clip: content-box;
  border: 2px solid transparent;
  border-radius: 19px;
  opacity: 0.8;
}

:deep(.hljs::-webkit-scrollbar-thumb:hover) {
  background: #a5b3cf;
  background-clip: content-box;
  border: 2px solid transparent;
}

:deep(.hljs::-webkit-scrollbar-track-piece) {
  width: 30px;
  height: 30px;
  background: #333;
}

::-webkit-scrollbar-button {
  display: none;
}
</style>

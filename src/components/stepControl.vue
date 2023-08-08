<template>
  <div class="step-wrap">
    <a-collapse :ghost="true" :bordered="false">
      <a-collapse-panel key="1" header="操作">
        <a-button @click="exportSceneToImage" class="export-btn" type="primary"
          >导出场景为图片</a-button
        >

        <a-table
          :pagination="false"
          :dataSource="dataSource"
          :columns="columns"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operate'">
              <span>
                <a-tooltip title="查看相关代码">
                  <a-button
                    @click="viewCode(record.key)"
                    type="primary"
                    shape="circle"
                    :icon="h(FileSearchOutlined)"
                  />
                </a-tooltip>
                |
                <a-tooltip title="删除此效果">
                  <a-button
                    @click="delEffect(record.key)"
                    danger
                    type="primary"
                    shape="circle"
                    :icon="h(DeleteOutlined)"
                  />
                </a-tooltip>
              </span>
            </template>
          </template>
        </a-table>
      </a-collapse-panel>
    </a-collapse>
  </div>
  <a-modal width="1000px" v-model:open="open" title="示例代码">
    <Suspense>
      <CodeBlock @getCode="getCode" :fileName="fileName"></CodeBlock>
    </Suspense>
    <template #footer>
      <a-button type="primary" @click="copyCode">复制代码</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import saveToImage from "/@/utils/exportImage";
import { FileSearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import CodeBlock from "/@/components/codeBlock.vue";
import { h, ref, Suspense, watch, reactive, toRefs, toRef } from "vue";
import { useRoute } from "vue-router";
import { getMenuItemByPath, getMenuItemById } from "/@/utils/menu";
import DestroyEffect from "/@/utils/destroyEffect";
const route = useRoute();
const fileName = ref();
const effect = reactive({
  ids: [],
});
const open = ref(false);
const dataSource = ref([]);
let code = "";
const columns = [
  {
    title: "效果名称",
    dataIndex: "effect",
    key: "effect",
  },
  {
    title: "操作",
    key: "operate",
  },
];
watch(
  () => route.path,
  (path, prevPath) => {
    if (path && path != "/") {
      const menuItem = getMenuItemByPath(path);
      let flag = true;
      for (let i = 0; i < effect.ids.length; i++) {
        if (effect.ids[i].id === menuItem.id) {
          flag = false;
        }
      }
      if (flag) {
        effect.ids.push(menuItem);
      }
      // fileName.value = menuItem.fileName || null;
    }
  },
  { immediate: true }
);

watch(
  effect,
  (newVal, oldVal) => {
    let ids = effect.ids;
    dataSource.value = [];
    for (let i = 0; i < ids.length; i++) {
      let item = {
        key: ids[i].id,
        effect: ids[i].title,
      };
      dataSource.value.push(item);
    }
  },
  { immediate: true }
);

const viewCode = (id) => {
  // const { fileName } = getMenuItemById(id);
  fileName.value = getMenuItemById(id).fileName;
  open.value = true;
};
const delEffect = (id) => {
  DestroyEffect.destroy(id);
  for (let i = 0; i < effect.ids.length; i++) {
    if (effect.ids[i].id === id) {
      const { ids } = toRefs(effect);
      ids.value.splice(i, 1);
    }
  }
};
const getCode = (text) => {
  code = text;
};
const copyCode = () => {
  let textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.setAttribute("readonly", "readonly");
  textarea.value = code;
  textarea.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    message.success("复制成功！");
  }
  document.body.removeChild(textarea);
};

const exportSceneToImage = () => {
  saveToImage(window.viewer);
};
</script>

<style scoped>
:deep(.ant-collapse-item .ant-collapse-header) {
  color: #fff; /* 修改标题的字体颜色为红色 */
  font-size: 16px;
}
.export-btn {
  margin-bottom: 10px;
}
</style>

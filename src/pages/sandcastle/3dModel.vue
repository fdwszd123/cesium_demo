<template>
  <a-collapse :ghost="true" :bordered="false">
    <a-collapse-panel key="1" header="设置">
      <a-row>
        <a-input-number
          v-model:value="height"
          prefix="模型所在高度："
          style="width: 180px"
        >
        </a-input-number>
        <a-button type="primary" @click="handleClick">确认</a-button>
      </a-row>
      <a-row>
        <a-select
          ref="select"
          v-model:value="value"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in modelFiles"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup>
import { modelFiles } from "/@/common/3D_models/files";
import { getModeItemById, createModel } from "/@/utils/model";
import { ref } from "vue";
const loadModel = (model) => {
  createModel(model.path, height.value);
};
const value = ref(1);
const height = ref(1000);
const model = getModeItemById(value.value);
loadModel(model);
const handleChange = (value) => {
  const model = getModeItemById(value);
  loadModel(model);
};
const handleClick = () => {
  const model = getModeItemById(value.value);
  loadModel(model);
};
</script>

<style scoped>
:deep(.ant-collapse-item .ant-collapse-header) {
  color: #fff; /* 修改标题的字体颜色为红色 */
  font-size: 16px;
}
</style>

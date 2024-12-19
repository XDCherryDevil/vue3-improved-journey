<template>
  <div class="containers">
    <div class="canvas" ref="canvas"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { xmlStr } from '../mock/xmlStr';

// 定义响应式变量
const bpmnModeler = ref(null);
const canvas = ref(null);

// 初始化BPMN图
const init = () => {
  bpmnModeler.value = new BpmnModeler({
    container: canvas.value
  });
  createNewDiagram();
};

// 创建新图表
const createNewDiagram = async () => {
  try {
    const result = await bpmnModeler.value.importXML(xmlStr);
    const { warnings } = result;
    console.log(warnings);  // 输出警告信息（如果有的话）
  } catch (err) {
    console.error('Error importing XML:', err.message);
  }
};

// 在组件挂载时调用init方法
onMounted(() => {
  init();
});
</script>

<style scoped>
.containers {
  width: 100%;
  height: calc(100vh - 82px);
}

.canvas {
  width: 100%;
  height: 100%;
}
</style>
<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <!-- 使用懒加载来提高性能 -->
        <el-tab-pane label="操作台" name="BpmnModeler">
            <Suspense>
                <BpmnModeler />
            </Suspense>
        </el-tab-pane>
        <el-tab-pane label="视图台" name="BpmnViewer">
            <Suspense>
                <BpmnViewer />
            </Suspense>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'

// 动态加载组件，使用懒加载提升性能
const BpmnModeler = defineAsyncComponent(() => import('./bpmn-modeler.vue'))
const BpmnViewer = defineAsyncComponent(() => import('./bpmn-viewer.vue'))

const activeName = ref('BpmnModeler')

// 点击 tab 时的回调函数
const handleClick = (tab: any, event: Event) => {
    console.log(`Tab clicked: ${tab.name}`)
}
</script>

<style lang="scss" scoped>
/* Tabs 样式优化 */
.demo-tabs {
    background-color: #f4f7fc;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.el-tabs__header {
    background-color: #ffffff;
    border-bottom: 1px solid #e4e7ed;
}

.el-tabs__nav {
    font-size: 14px;
}

.el-tab-pane {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    height: 100%;
}

/* 内容区样式 */
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 16px;
    font-weight: 400;
}

/* 使组件更加响应式 */
@media (max-width: 768px) {
    .demo-tabs {
        padding: 10px;
    }

    .el-tabs__header {
        font-size: 12px;
    }

    .el-tab-pane {
        padding: 15px;
    }
}
</style>
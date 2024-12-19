<template>
    <div class="containers">
        <div class="canvas" ref="canvas"></div>

        <ul class="buttons">
            <li>
                <el-button type="primary" @click="triggerFileInput">加载本地BPMN文件</el-button>
                <input type="file" ref="refFile" style="display: none" @change="loadXML" />
            </li>
            <li>
                <el-button type="primary" @click="downloadBPMN('bpmn')">保存为BPMN文件</el-button>
            </li>
            <li>
                <el-button type="primary" @click="downloadBPMN('svg')">保存为SVG</el-button>
            </li>
            <li>
                <el-button type="primary" @click="handlerZoom(0.1)">放大(Ctrl + +)</el-button>
            </li>
            <li>
                <el-button type="primary" @click="handlerZoom(-0.1)">缩小(Ctrl + -)</el-button>
            </li>
            <li>
                <el-button type="primary" @click="handlerZoom(0)">还原(Ctrl + 0)</el-button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { xmlStr } from '../mock/xmlStr';

// 定义BPMN模型器和DOM元素的引用
const bpmnModeler = ref(null);
const canvas = ref(null);
const refFile = ref(null);
const scale = ref(1);

// 默认的XML字符串
const xmlStrRef = ref(xmlStr);

// 初始化BPMN模型器并加载初始图表
const init = () => {
    bpmnModeler.value = new BpmnModeler({
        container: canvas.value,
        keyboard: {
            bindTo: window
        },
        additionalModules: [
            {
                // 禁止拖动线
                bendpoints: ["value", ""],
                // 禁用左侧面板
                paletteProvider: ["value", ""],
            }
        ]
    });
    createNewDiagram();
};

// 从XML字符串创建BPMN图表
const createNewDiagram = async () => {
    try {
        const result = await bpmnModeler.value.importXML(xmlStrRef.value);
        const { warnings } = result;
        console.log(warnings);
    } catch (err) {
        console.error('Error loading BPMN:', err.message);
    }
};

// 从选定的文件加载XML
const loadXML = async () => {
    const file = refFile.value?.files[0];
    if (!file) return; // 如果没有选择文件则退出
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        xmlStrRef.value = reader.result;
        createNewDiagram();
    };
};

// 下载BPMN图表，支持SVG或XML格式
const downloadBPMN = async (type) => {
    let result;
    if (type === 'bpmn') {
        result = await saveXMLFunc();
    } else if (type === 'svg') {
        result = await saveSVGFunc();
    }

    if (result) {
        const { data } = result;
        const fileName = type === 'bpmn' ? 'ops-coffee.bpmn' : 'ops-coffee.svg';
        const mimeType = type === 'bpmn' ? 'application/bpmn20-xml' : 'image/svg+xml';
        setEncoded(data, fileName, mimeType);
    }
};

// 保存BPMN图表为SVG格式
const saveSVGFunc = async () => {
    try {
        const result = await bpmnModeler.value.saveSVG();
        return { data: result.svg };
    } catch (err) {
        console.error('Error saving SVG:', err);
    }
};

// 保存BPMN图表为XML格式
const saveXMLFunc = async () => {
    try {
        const result = await bpmnModeler.value.saveXML({ format: true });
        return { data: result.xml };
    } catch (err) {
        console.error('Error saving XML:', err);
    }
};

// 设置下载链接并将数据进行URL编码
const setEncoded = (data, name, mimeType) => {
    const encodedData = encodeURIComponent(data);
    const link = document.createElement('a');
    link.href = `data:${mimeType};charset=UTF-8,${encodedData}`;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// 放大，缩小，还原
const handlerZoom = (radio) => {
    const newScale = !radio ? 1.0 : scale.value + radio;
    bpmnModeler.value.get("canvas").zoom(newScale);
    scale.value = newScale;
};

// 初始化BPMN模型器
onMounted(() => {
    init();
});
</script>

<style scoped>
.containers {
    background: white;
    overflow: auto;
    background-image: linear-gradient(90deg, rgba(220, 220, 220, 0.5) 6%, transparent 0),
        linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
    background-size: 12px 12px;
    width: 100%;
    height: calc(100vh - 142px);
    position: relative;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

.canvas {
    width: 100%;
    height: 100%;
}

.buttons {
    position: absolute;
    left: 20px;
    bottom: 20px;
}

.buttons li {
    display: inline-block;
    margin: 5px;
}

.buttons li a {
    color: #333;
    background: #fff;
    cursor: pointer;
    padding: 8px;
    border: 1px solid #ccc;
    text-decoration: none;
}

.el-button {
    margin-right: 10px;
}
</style>
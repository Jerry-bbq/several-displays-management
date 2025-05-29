<template>
  <div class="container">
    <!-- <h1 class="title">报表</h1>
    <div v-for="(item, index) in data" :key="index" class="report-item">{{ item.title }}</div> -->
    <h1 class="title">屏幕</h1>
    <div class="content">
      <div v-for="(item, index) in screenList" :key="item.id" class="item" @click="handleClick(item, data[index].url)">
        <div>序号：{{ index + 1 }}</div>
        <div>名称：{{ item.label }}</div>
        <div>尺寸：{{ item.size.width }}*{{ item.size.height }}</div>
        <div>报表名称：{{ data[index].title }}</div>
      </div>
    </div>
    <!-- <n-button type="primary" @click="handleOpenAll">一键打开</n-button> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NButton } from 'naive-ui'
import data from './utils/data.js'

console.log(data, 'data')

let arr = []
for (let i = 0; i < 10; i++) {
  console.log(10)
  arr.push({
    accelerometerSupport: 'unknown',
    bounds: { x: 1440, y: -180, width: 1920, height: 1080 },
    colorDepth: 24,
    colorSpace:
      '{r:[0.6394, 0.3439], g:[0.3145, 0.6170], b:[0.1425, 0.0615], w:[0.3127, 0.3290]}, transfer:{0.0777*x + 0.0000 if abs(x) < 0.0450 else sign(x)*((0.9495*abs(x) + 0.0495)**2.3955 + 0.0003)}, matrix:RGB, range:FULL}',
    depthPerComponent: 8,
    detected: true,
    displayFrequency: 60.000003814697266,
    id: i,
    internal: false,
    label: 'DELL E2222H',
    maximumCursorSize: { width: 0, height: 0 },
    monochrome: false,
    nativeOrigin: { x: 0, y: 0 },
    rotation: 0,
    scaleFactor: 1,
    size: { width: 1920, height: 1080 },
    workArea: { x: 1440, y: -155, width: 1920, height: 1055 },
    workAreaSize: { width: 1920, height: 1055 },
    touchSupport: 'unknown',
  })
}

const screenList = ref()

const handleClick = (display, url) => {
  window.api.handleOpenUrl(JSON.stringify(display), url)
}

const handleOpenAll = () => {
  screenList.value.forEach((item, index) => {
    window.api.handleOpenUrl(JSON.stringify(item), data[index].url)
  })
}

onMounted(async () => {
  const screen = await window.api.getAllDisplays()
  screenList.value = screen
  console.log(screen)
})
</script>

<style>
.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px 0;
}
.report-item {
  display: inline-block;
  margin-right: 10px;
}
.item {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>

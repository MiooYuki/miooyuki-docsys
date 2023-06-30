<template>
  <el-form
    label-position="left"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="文档名称：">
      <el-input v-model="formLabelAlign.name"/>
    </el-form-item>
    <el-form-item label="文档描述：">
      <el-input v-model="formLabelAlign.region"/>
    </el-form-item>
    <el-form-item label="文档封面图：">
      <el-upload
        ref="upload"
        list-type="picture-card"
        :auto-upload="false"
        limit="1"
        :on-exceed="handleExceed"
      >
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>
  </el-form>
  <el-button @click="test">asd</el-button>
</template>
<script lang="ts" setup>
import {reactive} from 'vue'
import { ref } from 'vue'
import {Plus} from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import axios from "axios";

const formLabelAlign = reactive({
  name: '',
  region: '',
})

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const test = () => {

}
</script>

<template>
  <el-row style="height: 4vh">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/doclist' }">文档列表</el-breadcrumb-item>
      <el-breadcrumb-item>新建文档</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-form
      :label-position="'right'"
      label-width="100px"
      :model="docinfo"
      style="max-width: 460px"
  >
    <el-form-item label="文档名称：">
      <el-input v-model="docinfo.name"/>
    </el-form-item>
    <el-form-item label="文档描述：">
      <el-input type="textarea" rows="5" v-model="docinfo.description"/>
    </el-form-item>
    <el-form-item label="封面图片：">
      <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/documents/upload"
          :show-file-list="false"
          :on-success="handleSuccess"
      >
        <el-image :fit="'contain'" v-if="docinfo.imageUrl" :src="docinfo.imageUrl" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="submit">提交</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter()

let docinfo = ref({
  name: '',
  description: '',
  imageUrl: ''
})

const submit = () => {
  console.log(docinfo.value)
  axios({
    method: 'POST',
    url: 'http://localhost:8081/documents/create',
    data: docinfo.value
  }).then((response) => {
    console.log(response)
    router.push('/doclist')

  }).catch((error) => {
    console.log(error)
  })
}

const handleSuccess = (result: any) => {
  docinfo.value.imageUrl = result.data
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
}

.avatar-uploader {
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
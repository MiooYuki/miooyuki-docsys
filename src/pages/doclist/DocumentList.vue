<template>
  <el-row style="height: 4vh">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>文档列表</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row gutter="14">
    <el-col :xl="4" :lg="6">
      <el-input placeholder="文档标题" v-model="search.name"></el-input>
    </el-col>
    <el-col :xl="3" :lg="5">
      <el-button type="primary">搜索</el-button>
      <el-button type="success" @click="create">新建文档</el-button>
    </el-col>
  </el-row>
  <el-row gutter="14">
    <el-col v-for="doc in doclist" :xl="4" :lg="6" style="margin-top: 14px">
      <el-card :body-style="{ padding: 0 }">
        <el-image
            :fit="'cover'"
            :src="doc.imageUrl"
            style="width: 100%; height: 140px;">
        </el-image>
        <div style="padding: 14px">
          <h4 class="card-title">{{ doc.name }}</h4>
          <div class="card-desc">{{ doc.description }}</div>
          <el-row justify="end">
            <el-tooltip
                effect="light"
                raw-content
                :content="'创建日期：' + doc.createdAt + '<br/>' + '更新日期：' + doc.updatedAt"
            >
              <span style="color: rgb(128, 128, 128)">2023-12-16 23:23</span>
            </el-tooltip>
          </el-row>
          <el-row justify="end" style="margin-top: 10px">
            <el-button link type="primary">编辑</el-button>
            <el-button link type="primary">查看</el-button>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row justify="center" style="margin-top: 14px">
    <el-pagination
        background
        layout="prev, pager, next"
        :page-count="pages"
        @current-change="currentChange"
    ></el-pagination>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter()

const search = ref({
  name: ''
})

let doclist = ref([
  {
    name: 'Title',
    description: 'Document description.',
    imageUrl: 'https://cn.bing.com/th?id=OHR.GrandPlaceXmas_ZH-CN8299342316_UHD.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    createdAt: '2023-12-16 23:23',
    updatedAt: '2023-12-16 23:23'
  },
])

let pages = ref(1)
let pageSize = ref(12)

/**
 * 当改变当前页码时
 * @param value 当前页码
 */
const currentChange = (value: number) => {
  axios({
    method: 'GET',
    url: 'http://localhost:8081/documents/list/' + value + '/' + pageSize.value
  }).then((response) => {
    doclist.value = response.data.data.records
    pages.value = response.data.data.pages

  }).catch((error) => {
    console.log(error)
  })
}

/**
 * 路由至创建文档
 */
const create = () => {
  router.push("/doclist/create")
}

onMounted(() => {
  // 根据屏幕宽度，设定每页应显示的条数
  const width = document.body.clientWidth;
  if (width >= 1920) {
    pageSize.value = 12
  } else if (width >= 1200) {
    pageSize.value = 8
  }
  // 初始请求数据
  axios({
    method: 'GET',
    url: 'http://localhost:8081/documents/list/1/' + pageSize.value
  }).then((response) => {
    doclist.value = response.data.data.records
    pages.value = response.data.data.pages

  }).catch((error) => {
    console.log(error)
  })
})
</script>

<style lang="scss" scoped>
.card-title {
  margin-top: 0;
  margin-bottom: 10px;
}

.card-desc {
  font-weight: lighter;
  margin-bottom: 10px;
  min-height: 62px;
  max-height: 62px;
  overflow: hidden;
}
</style>
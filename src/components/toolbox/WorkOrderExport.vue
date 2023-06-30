<template>
  <v-row>
    <v-col cols="2">
      <el-select v-model="tenant" value-key="id" placeholder="请选择租户" @change="selectTenant" @clear="tenantClear"
                 filterable clearable style="width: 100%">
        <el-option
          v-for="tenant in tenantList"
          :key="tenant.id"
          :label="tenant.name"
          :value="tenant"
        />
      </el-select>
    </v-col>
    <v-col cols="3">
      <el-select v-model="product" value-key="id" placeholder="请选择产品" @clear="productClear" filterable clearable
                 style="width: 100%">
        <el-option
          v-for="product in productList"
          :key="product.id"
          :label="product.name"
          :value="product"
        />
      </el-select>
    </v-col>
    <v-col>
      <el-input v-model="time" placeholder="计划时间" style="width: 100%"/>
    </v-col>
    <v-col cols="5">
      <el-input v-model="description" placeholder="情况说明" style="width: 100%"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <el-button type="primary" text bg @click="add">添加</el-button>
      <el-button type="primary" text bg @click="sub">减少</el-button>
      <el-button type="primary" @click="download">生成表格</el-button>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <el-text type="danger">提示：</el-text>
      <el-text type="info">因未知的玄学原因，下载下来的表格需要打开后，按 ctrl + s 保存一下，才能在售后宝导入成功。
      </el-text>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <el-table :data="tableData" border>
        <el-table-column prop="tenantCode" label="客户编号" width="180"/>
        <el-table-column prop="productCode" label="产品系统编号" width="300"/>
        <el-table-column prop="time" label="计划时间"/>
        <el-table-column prop="description" label="情况说明" width="580"/>
      </el-table>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import Cookie from "js-cookie";
import {ElMessage, ElMessageBox} from 'element-plus'

type Tenant = {
  id: number
  name: string
  code: string
}
type Product = {
  id: number
  tenantId: number
  name: string
  code: string
}
const tenant = ref<Tenant>()
const tenantList = ref([{
  id: '111',
  name: '测试租户',
  code: '11111'
}])
const product = ref<Product>()
const productList = ref([{
  id: '111',
  tenant_id: '111',
  name: '测试产品',
  code: '11111'
}])

const time = ref('')
const description = ref('')
const tableData = ref([])

// 当选择租户后调用
const selectTenant = () => {
  axios.get('/toolbox/orderwork/tenant/products?tenant_id=' + tenant.value?.id)
    .then((response) => {
      productList.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

// 添加一行数据
const add = () => {
  if (tenant.value === undefined) {
    ElMessageBox({
      message: '未选择租户。',
      title: '提示',
      confirmButtonText: '确定'
    })
    return
  }
  if (product.value === undefined) {
    ElMessageBox({
      message: '未选择产品。',
      title: '提示',
      confirmButtonText: '确定'
    })
    return
  }
  if (description.value === '') {
    ElMessageBox({
      message: '未输入情况说明。',
      title: '提示',
      confirmButtonText: '确定'
    })
    return
  }
  tableData.value.push({
    tenantCode: tenant.value?.code,
    productCode: product.value?.code,
    time: time.value,
    description: description.value
  })
  Cookie.set('tableData', JSON.stringify(tableData.value), {expires: 2})
  description.value = ''
  tenant.value = undefined
  product.value = undefined
}

// 删除最后一行的数据
const sub = () => {
  tableData.value.pop()
  Cookie.set('tableData', JSON.stringify(tableData.value), {expires: 2})
}

// 租户选择框清除租户时调用
const tenantClear = () => {
  tenant.value = undefined
}
// 产品选择框清除产品是调用
const productClear = () => {
  product.value = undefined
}

// 下载表格
const download = () => {
  let win: any = window
  axios.post('/toolbox/orderwork/download', tableData.value,
    {
      responseType: 'blob'
    })
    .then((response) => {
      console.log(response);
      console.log(response.data.type);
      let blob = new Blob([response.data], {type: response.data.type});
      let url = win.URL.createObjectURL(blob);
      console.log(url);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);    //下载完成移除元素
      win.URL.revokeObjectURL(url);       //释放掉blob对象
    })
    .catch((error) => {
      console.log(error)
      ElMessage.error('后端请求失败！')
    })
}

onMounted(() => {
  axios.get('/toolbox/orderwork/tenant/list')
    .then((response) => {
      tenantList.value = response.data
    })
    .catch((error) => {
      console.log(error)
      ElMessage.error('获取数据失败！')
    })
  let date = new Date();
  time.value = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
  if (Cookie.get('tableData') !== undefined) {
    tableData.value = JSON.parse(Cookie.get('tableData'))
  }
})
</script>

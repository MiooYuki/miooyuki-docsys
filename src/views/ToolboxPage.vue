<template>
  <v-row>
    <v-col>
      <v-btn color="primary" @click="orderExport">工单导入数据生成</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();

function orderExport() {
  router.push({
    path: '/dashboard/toolbox/workorder'
  })
}
</script>

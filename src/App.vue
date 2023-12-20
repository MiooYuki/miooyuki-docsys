<template>
  <el-container>
    <el-header class="header">
      <!-- Header start -->
      <el-row align="middle" justify="end" gutter="16" style="height: 8vh;">

      </el-row>
      <!-- Header end -->
    </el-header>
    <el-container class="container">
      <el-aside class="aside" width="200px">
        <!-- Aside start -->
        <el-menu
            class="el-menu-vertical-demo"
            default-active="2"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <document/>
              </el-icon>
              <span>折叠菜单</span>
            </template>
            <el-menu-item index="1-1">
              <el-icon>
                <Folder/>
              </el-icon>
              <span>子菜单一</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <el-icon>
                <Calendar/>
              </el-icon>
              <span>子菜单二</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2" @click="doclist">
            <el-icon>
              <House/>
            </el-icon>
            <span>菜单二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <location/>
            </el-icon>
            <span>菜单三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting/>
            </el-icon>
            <span>菜单四</span>
          </el-menu-item>
        </el-menu>
        <!-- Aside end -->
      </el-aside>
      <el-main class="main">
        <!-- Main Start -->
        <router-view></router-view>
        <!-- Main end -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

const doclist = () => {
  router.push('/doclist')
}
</script>

<style lang="scss" scoped>
.header {
  height: 6vh;
  background-color: #606266;
}

.container {
  height: 94vh;

  .aside {
    background-color: rgb(220, 223, 230);
  }
}
</style>
<template>
  <v-app id="inspire">
    <v-navigation-drawer>
      <v-sheet
        color="grey-darken-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
          v-bind:image="avatarUrl"
        ></v-avatar>

        <div>{{ nickname }}</div>
        <div>{{ email }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          v-for="[icon, text, path] in links"
          :key="icon"
          link
          @click="goto(path)"
        >
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();

let avatarUrl = 'https://img.tmuyun.com/assets/20221107/1667786191796_636865cfb40eef3ff7a2e839.png'
let nickname = '昵称'
let email = 'example@gmail.com'
const links = [
  ['mdi-file-document-outline', '文档管理', '/dashboard/mydocs'],
  ['mdi-toolbox-outline', '工具箱', '/dashboard/toolbox'],
]

const goto = (path: string) => {
  router.push({
    path: path,
  })
}
</script>

<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="3">
      <v-text-field
        density="compact"
        variant="outlined"
        label="搜索文档"
        append-inner-icon="mdi-magnify"
        hide-details
        @click:append-inner="search"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col xl="2" lg="3" v-for="doc in page.records" :key="doc.id">
      <v-hover v-slot:default="{ isHovering, props }">
        <v-card
          v-bind="props"
          class="mx-auto rounded-lg"
          max-width="300"
          :elevation="isHovering ? 10 : 2"
        >
          <v-img
            class="align-end text-white"
            height="200"
            v-if="doc.imageUrl !== ''"
            :src=doc.imageUrl
            cover
          >
            <v-card-title>{{ doc.name }}</v-card-title>
          </v-img>
          <v-img
            class="align-end text-white"
            height="200"
            v-else
            src="@/assets/doc.png"
            cover
          >
            <v-card-title>{{ doc.name }}</v-card-title>
          </v-img>

          <v-card-text>
            <div>{{ doc.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange">编辑</v-btn>
            <v-btn color="orange">进入文档</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
    <v-col xl="2" lg="3">
      <v-hover v-slot:default="{ isHovering, props }">
        <v-card
          v-bind="props"
          class="mx-auto rounded-lg"
          max-width="300"
          :elevation="isHovering ? 10 : 2"
        >
          <v-img
            class="align-end text-white"
            height="200"
            src="@/assets/add.png"
            cover
          ></v-img>
          <v-card-text><br></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addDoc">新建文档</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-pagination :length="page.pages" rounded="circle" v-model="page.current"
                    @update:modelValue="scrollPage"></v-pagination>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter()

const page = ref({
  current: 1,
  pages: 1,
  records: [
    {
      id: '11111',
      name: 'Example Doc',
      description: 'There is description...',
      imageUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
    }
  ]
})

const search = () => {

}

const addDoc = () => {
  router.push({
    path: '/dashboard/mydocs/add'
  })
}

const scrollPage = () => {
  axios.get('/document/list/' + page.value.current + '/7')
    .then((response) => {
      page.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  axios.get('/document/list/' + page.value.current + '/7/')
    .then((response) => {
      page.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <v-row>
    <v-col>
      <v-btn @click="this.$router.push('/', () => { }, () => { })">back</v-btn>
      <v-btn @click="render">render</v-btn>
      <v-btn @click="this.markdown = ''">clear</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2">

    </v-col>
    <v-col cols="8">
      <v-md-editor v-model="markdown" mode="preview"/>
    </v-col>
  </v-row>
</template>

<script>
import API from "@/plugins/axios";

export default {
  name: 'DocumentPage',

  data() {
    return {
      markdown: ''
    }
  },

  methods: {
    render() {
      API.get('/document/render')
        .then((response) => {
          this.markdown = response.data
        })
        .catch((error) => {
          error
        })
    }
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>

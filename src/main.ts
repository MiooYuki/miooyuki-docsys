import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import 'element-plus/theme-chalk/src/index.scss'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

import axios from 'axios'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)

registerPlugins(app)

axios.defaults.baseURL = 'http://10.100.173.144:8081'
axios.defaults.timeout = 3000

app.mount('#app')
app.use(VueMarkdownEditor);

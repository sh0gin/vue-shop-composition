import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

createApp(
    App

).use(router).mount('#app')

// app.config.globalProperties.$config = reactive({
//     apiUrl: 'http://web3-14-08-25.local/',
//     activeToken: null,
//     userStatus: null,
// });



// app.use(router)


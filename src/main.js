import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Add FontAwsome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
library.add(faCalendar,faArrowLeft)

// Add Tailwinds styles
import './index.css'

// App main styles
import './assets/main.css'

// Datepicker component
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('Datepicker', Datepicker);
app.mount('#app')

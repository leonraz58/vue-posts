import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from "@/router/router";
import Vintersection from "@/directives/Vintersection";
import directives from "@/directives";
import Vfocus from "@/directives/Vfocus";

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

// app.directive('intersection', Vintersection)
// app.directive('focus', Vfocus)

app .use(router)
    .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { localAgentUrlParam } from './constants'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('[Vue Global Error Handler]', err, info)
}



// Check for query parameter to override agent selection
const urlParams = new URLSearchParams(window.location.search);
const hasLocalAgentParam = urlParams.get(localAgentUrlParam) === 'true';
const useLocalAgent = hasLocalAgentParam || import.meta.env.VITE_USE_LOCAL_AGENT;

// Initialize Pendo based on environment and query parameter
if (useLocalAgent) {
  const reason = hasLocalAgentParam ? 'query parameter' : 'environment variable';
  console.debug(`[Sandbox] Using local agent (triggered by ${reason})`);
  (function(localAgentUrl){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
        y=e.createElement(n);y.async=!0;y.src=localAgentUrl;
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
  })(import.meta.env.VITE_LOCAL_AGENT_URL);
} else {
  console.debug('[Sandbox] Using production agent');
  (function(apiKey, cdnUrl){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
        y=e.createElement(n);y.async=!0;y.src=`${cdnUrl}/agent/static/${apiKey}/pendo.js`;
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
  })(import.meta.env.VITE_PENDO_API_KEY, import.meta.env.VITE_PENDO_CDN);
}

app.use(router)
app.mount('#app')


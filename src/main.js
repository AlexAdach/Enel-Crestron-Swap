import { createApp } from 'vue'
import App from './App.vue'

import TeamsCard from './components/ui/TeamsCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import ConnectingMessage from './components/ui/ConnectingMessage.vue';
import BaseSliderHorizontal from './components/ui/BaseSliderHorizontal.vue';
const app = createApp(App);


app.component('connecting-message', ConnectingMessage);
app.component('base-slider-horizontal', BaseSliderHorizontal);
app.component('teams-card', TeamsCard);
app.component('base-button', BaseButton);


app.mount('#app');



import Vuex from 'vuex';

import login from './modules/login';
import home from './modules/home';

new Vuex.Store({
	login,
	home,
});
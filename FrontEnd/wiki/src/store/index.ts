import { createStore } from 'vuex';
import VuexPersister from 'vuex-persister';
import modules from '@/store/modules';
import { SearchState } from './modules/search';

export interface RootState {
  search: SearchState;
}

const vuexPersister = new VuexPersister({
  storage: window.localStorage,
});

const store = createStore<RootState>({
  modules,
  plugins: [vuexPersister.persist],
  strict: false,
});

export default store;

import type { Commit } from "vuex";

export interface SearchState {
    searchResults: Array<any>;
    loading: boolean;
    history: string[];
}



const state: SearchState = {

    searchResults: [],
    loading: false,
    history: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
};
const getters = {
    getSearchResults: (state: { searchResults: SearchState }) => state.searchResults,
}


const mutations = {
    setLoading(state: { loading: boolean; }, loading: boolean) {
        state.loading = loading;
    },
    setSearchResults(state: { searchResults: any[]; }, results: Array<any>) {
        state.searchResults = results;
    },
    addToHistory(state: { history: any[]; }, query: any) {
        if (!state.history.includes(query)) {
            state.history.unshift(query);
            if (state.history.length > 10) state.history.pop();
            localStorage.setItem('searchHistory', JSON.stringify(state.history));
        }
    },
    removeFromHistory(state: { history: any[] }, query: any) {
        state.history = query == null || (Array.isArray(query) && !query.length)
            ? []
            : state.history.filter(history => history !== query);
        localStorage.setItem('searchHistory', JSON.stringify(state.history));
    }
    
    
}
const actions = {
    async fetchSearchResults(
        { commit }: { commit: Commit },
        { query, page }: { query: string; page: number }
    ) {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            commit('addToHistory', trimmedQuery);
        }
        commit('setLoading', true);
        commit('addToHistory', query);
        try {
            const response = await fetch(`http://localhost:3000/api/wikipedia/search?q=${query}&page=${page}`);
            const data = await response.json();
            commit('setSearchResults', data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            commit('setSearchResults', []);
        } finally {
            commit('setLoading', false);
        }
    },
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
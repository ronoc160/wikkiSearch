<template>
  <div class="flex flex-col items-center py-10 bg-gray-100 dark:bg-grey-900 min-h-screen">
    <div
      class="w-full max-w-md lg:max-w-lg xl:max-w-2xl p-4 md:p-8 lg:p-12 mx-auto bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg">
      <div class="flex items-center space-x-2 mb-1">
        <input v-model="query" @input="handleInput" @focus="showHistory = true" placeholder="Search Wikipedia..."
          class="w-full p-3 border-2 border-transparent focus:border-blue-500 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none transition-colors duration-200"
          aria-label="Search Wikipedia" />
        <button @click="triggerSearch" aria-label="Search"
          class="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200 flex items-center justify-center">
          <IconSearch aria-hidden="true" />
        </button>
      </div>

      <div class="min-h-[300px] relative flex flex-col justify-center" data-testid="main-content-area">
        <!-- History Dropdown -->
        <ul v-if="showHistory && (history?.length || 0) > 0"
          class="absolute top-0 bg-white dark:bg-gray-700 border dark:border-gray-600 w-full rounded-md shadow-lg max-h-48 overflow-y-auto">
          <li class="p-2 italic flex relative dark:bg-black-100 text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 transition">
            Recent Searches <span class=" text-sm ml-auto cursor-pointer" @click="clearHistory(null)">clear history</span>
          </li>
          <li v-for="(item, index) in history || []" :key="index"
            class="flex relative">
            <span class="relative w-full p-2 flex cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition" @click="selectHistory(item)"> {{ item }}</span>

            <span class="absolute right-[15px] top-2 ml-auto" @click="clearHistory(item)">
              <IconX class="w-[15px] cursor-pointer"></IconX>
            </span>
          </li>
        </ul>

        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center items-center mt-4">
          <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
        <!-- Search Results -->
        <div v-if="!loading && visibleItems.length">
          <ul class="mt-6 space-y-4">
            <p class="text-gray-900 dark:text-gray-100 text-center">Wikipedia found {{ totalPages }} results</p>
            <li v-for="(item, idx) in visibleItems" :key="idx"
              class="p-4 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-md transition-transform hover:scale-105">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ item.title }}</h3>
              <p v-html="item.snippet" class="text-gray-700 dark:text-gray-300"></p>
            </li>
          </ul>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-between mt-6">
            <button @click="prevPage" :disabled="currentPage === 1" aria-label="Previous Page"
              class="px-4 py-2 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <span class="text-gray-600 dark:text-gray-400">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" aria-label="Next Page"
              class="px-4 py-2 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>

        <div v-if="!loading && !visibleItems.length && query && !errorMessage"
          class="text-center text-gray-500 dark:text-gray-400 mt-6">
          No results found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useVirtualList, UseVirtualListItem } from '@vueuse/core'
import { useDebounceFn } from '@vueuse/core';
import { IconSearch, IconX } from '@tabler/icons-vue'

const query = ref('')
const errorMessage = ref('')
const showHistory = ref(false)
const store = useStore()
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const history = computed(() => store.state.search.history)

interface SearchResult {
  title: string
  snippet: string
}
const reactiveSearchResults = ref<SearchResult[]>([])
const visibleItems = ref<UseVirtualListItem<SearchResult>[]>([]);

onMounted(() => {
  const { list } = useVirtualList(reactiveSearchResults, {
    itemHeight: 80,
    overscan: 10,
  });


  visibleItems.value = list.value;
});

watchEffect(() => {
  const newResults = store.state.search.searchResults
  visibleItems.value = newResults.results || []
  totalPages.value = Math.ceil((newResults.totalResults || 0) / 10)
})
const handleInput = () => {
  const trimInput = query.value.trim();
  showHistory.value = true
  if (trimInput) {
    debouncedSearch()
  }
}
const clearHistory = async (value: any) => {
  await store.commit('search/removeFromHistory', value)
};
const triggerSearch = async () => {
  loading.value = true
  const trimmedQuery = query.value.trim()
  if (!trimmedQuery) {
    loading.value = false;
    return;
  }
  try {
    await store.dispatch('search/fetchSearchResults', { query: trimmedQuery, page: currentPage.value })
  } catch {
    errorMessage.value = 'Search failed'
  } finally {
    loading.value = false
    showHistory.value = false
  }
}

const selectHistory = (item: string) => {
  query.value = item
  triggerSearch()
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    triggerSearch()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    triggerSearch()
  }
}

const debouncedSearch = useDebounceFn(triggerSearch, 300)

const handleClickOutside = (event: MouseEvent) => {
  const searchBox = document.querySelector('.w-full.max-w-md')
  if (searchBox && !searchBox.contains(event.target as Node)) {
    showHistory.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils';
import SearchComponent from '@/components/SearchComponent.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createStore } from 'vuex';

describe('SearchComponent', () => {
  let store: any;

  beforeEach(() => {
    store = createStore({
      state: {
        search: {
          searchResults: [],
          history: [],
        },
      },
      actions: {
        'search/fetchSearchResults': vi.fn(),
      },
    });
  });

  it('renders correctly on initial load', () => {
    const wrapper = mount(SearchComponent, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find('input[aria-label="Search Wikipedia"]').exists()).toBe(true);
    expect(wrapper.find('button[aria-label="Search"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="main-content-area"]').exists()).toBe(true);
  });

  it('updates query on input', async () => {
    const wrapper = mount(SearchComponent, {
      global: {
        plugins: [store],
      },
    });
    const input = wrapper.find('input[aria-label="Search Wikipedia"]');
    await input.setValue('Test query');
    expect(wrapper.vm.query).toBe('Test query');
  });

  it('calls triggerSearch on search button click', async () => {
    const triggerSearch = vi.fn();
    const wrapper = mount(SearchComponent, {
      global: {
        plugins: [store],
        mocks: { triggerSearch },
      },
    });
    await wrapper.find('button[aria-label="Search"]').trigger('click');
    expect(triggerSearch).toHaveBeenCalled();
  });

  it('displays search history when input is focused', async () => {
    store.state.search.history = ['Previous search 1', 'Previous search 2'];
    const wrapper = mount(SearchComponent, {
      global: {
        plugins: [store],
      },
    });
    await wrapper.find('input[aria-label="Search Wikipedia"]').trigger('focus');
    expect(wrapper.find('.absolute.top-0.bg-white').isVisible()).toBe(true);
  });


});

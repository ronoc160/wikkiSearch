## Overview

Welcome! This app is a lightweight, single-page Wikipedia search tool that allows you to find articles quickly, view results in an organized way, and revisit recent searches. Plus, it’s designed with both light and dark mode themes for a comfortable viewing experience.

## What’s Inside

### Key Features

1. **Fast Wikipedia Search** – Type in your search term, and the app will fetch Wikipedia articles for you. The search input is debounced to reduce API requests while you type.
2. **Real-Time Search with Input Debounce** – Avoids overloading the server with requests, ensuring a smooth experience.
3. **Recent Searches** – Quickly revisit past searches in a dropdown that can be managed with individual delete options.
4. **Light and Dark Modes** – Switches seamlessly between light and dark themes to suit your environment and preferences.
5. **Responsive, Mobile-Friendly Design** – The layout scales gracefully on different screen sizes, so it looks great on both desktop and mobile.

## How It’s Built

The app has two main parts:
- **Frontend** (built with Vue 3, Vuex, and Tailwind CSS for styling)
- **Backend** (Node.js and Express to handle Wikipedia API requests)

The interface is designed to be **simple, intuitive, and accessible**. With light and dark themes, responsive layout, and smooth animations, we focused on making the app visually appealing and easy to use.

## Setup Guide

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation Steps

1.  **Install Dependencies**

 For both frontend and backend install Dependencies
    
    cd FrontEnd / wiki 

        npm run dev

    cd into groupOn API

        npm start

2. ### Open in Browser**
    
     Visit http://localhost:5173/ in your browser to check out the app.

3. ### Using the App

  **Search** – Type in the search bar to look for articles. The input is debounced to prevent multiple API requests.

  **View Results** – Articles show up with titles and snippets in a virtualized list, making scrolling smooth.

  **Navigate Results** – Use pagination controls to move through results pages.

  **Dark/Light Mode** – The app adjusts based on your system’s theme or your preference, switching seamlessly between light and dark modes.

  **Search History** – View recent searches in a dropdown, click to search them again, or remove items individually.

  **Loading Indicator** – A loading spinner appears when data is being fetched, providing feedback to the user.

4. ### Design & UI/UX Considerations

The interface is designed to feel lightweight, accessible, and aesthetically pleasing with:

**Dark and Light Mode:** Automatically switches based on system preferences or manually, giving a comfortable viewing experience in any environment.

**Responsive Design:** Tailwind CSS makes it easy to adapt to different screen sizes, so the app is mobile-friendly and feels consistent across devices.

**Accessible Controls and Animations:** Subtle hover and click animations improve the user experience without being distracting, while clear labels and controls enhance accessibility.

**Intuitive Search History:** The search history dropdown keeps recent searches easily accessible with a clear history option and individual removal of history item


5. ### Performance Optimizations

**Debounced Search Input:** To avoid overwhelming the server with requests, the search input has a 300ms debounce interval, meaning requests are only made when you’ve stopped typing briefly.

**Virtualized Lists:** Using useVirtualList, the app only displays what’s visible on the screen, keeping performance high for large result sets.
**Backend Caching:** The backend caches recent queries to speed up repeat searches.

**Efficient State Management with Vuex:** Vuex handles search results, loading states, and history, ensuring the app remains responsive and performant without wastedful API requests.

6. ### Testin

**Search Functionality** – Verifying the search input, debounced calls, and the display of search results.#   w i k k i S e a r c h  
 #   w i k k i S e a r c h  
 
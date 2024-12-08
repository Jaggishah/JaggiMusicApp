// store.js
import { create } from 'zustand';
import axios from 'axios';
import { enviroment } from './enviroment';


const useStore = create((set) => ({
    page : 1,
    sliderValue : 0,
    setSliderValue: (value) => {
      set({ sliderValue: value }); 
    },
    currentIndex: undefined,
    setCurrentIndex : (value) => {
      set({ currentIndex: value }); 
    },
    storeData:{
      data:[]
    },
    setStore : (data) => {
      set({ storeData: {data} }); 
    },
    songs : {
        data : [],
        loading : false,
        error : null,
    },

    setPage: () => set((state) => ({ page: state.page + 1 })),

  fetchSingleSongs: async (page = 1) => {
    if (page === 10) return;
    let songsTemp = {
      loading: true,
      error : null,
    }
    set((state) => ({ songs: {...songsTemp,data:[...state.songs.data]} }))
    try {
      const response = await axios.get(enviroment.singleTrackUrl + page);
      let songsTemp = {
        loading: false,
        error : null,
      }
      set((state) => ({ songs: {...songsTemp,data:[...state.songs.data, ...response.data?.data]} }))

    } catch (error) {
        let songsTemp = {
            data : [],
            loading: false,
            error :  error?.response?.data?.error || 'Failed to fetch data',
          }
          set({ songs: songsTemp }); 
    }
  },
}));

export default useStore;





import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import themeReducer from "./slices/themeSlice"
import imageReducer from "./slices/imageSlice";
import collectionReducer from "./slices/collectionSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    theme: themeReducer,
    images: imageReducer,
    collections: collectionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
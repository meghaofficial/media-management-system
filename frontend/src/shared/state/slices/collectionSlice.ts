import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CollectionItem } from "../../types";

interface collectionState {
  value: CollectionItem[];
}

const initialState: collectionState = {
  value: [],
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    createCollection: (state, action: PayloadAction<CollectionItem>) => {
      state.value = [...state.value, action.payload];
    },
    removeCollection: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (collec) => collec?.id?.toString() !== action?.payload,
      );
    },
    renameCollection: (
      state,
      action: PayloadAction<{ id: string | number; name: string }>,
    ) => {
      const { id, name } = action.payload;
      const collec = state.value.find(
        (c) => c?.id?.toString() === id?.toString(),
      );
      if (collec) {
        collec.name = name;
      }
    },
    addImage: (
      state,
      action: PayloadAction<{ id: string | number; imgUrl: string }>,
    ) => {
      const { id, imgUrl } = action.payload;
      const collec = state.value.find(
        (c) => c?.id?.toString() === id?.toString(),
      );
      if (collec) {
        if (!collec.imgUrls) {
          collec.imgUrls = [];
        }
        collec.imgUrls.push(imgUrl);
      }
    },
    removeImage: (
      state,
      action: PayloadAction<{ id: string | number; imgUrl: string }>,
    ) => {
      const { id, imgUrl } = action.payload;
      const collec = state.value.find(
        (c) => c?.id?.toString() === id?.toString(),
      );
      if (collec) {
        collec.imgUrls = collec.imgUrls.filter((urls) => urls !== imgUrl);
      }
    },
  },
});

export const {} = collectionSlice.actions;
export default collectionSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ImageItem } from "../../types";

interface imageState {
  value: ImageItem[];
}

const initialState: imageState = {
  value: [],
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImages: (state, action: PayloadAction<ImageItem[]>) => {
      state.value.push(...action.payload);
    },
    renameImage: (
      state,
      action: PayloadAction<{ id: string | number; name: string }>,
    ) => {
      const { id, name } = action.payload;
      const image = state.value.find((img) => img.id === id);
      if (image) {
        image.name = name;
      }
    },
  },
});

export const { addImages, renameImage } = imageSlice.actions;
export default imageSlice.reducer;

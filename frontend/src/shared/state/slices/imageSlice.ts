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
    setImages: (state, action: PayloadAction<ImageItem[]>) => {
      state.value = action.payload;
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
    removeImage: (state, action: PayloadAction<number | string>) => {
      state.value = state.value.filter(
        (img) => img.id.toString() !== action.payload.toString(),
      );
    },
  },
});

export const { setImages, renameImage, removeImage } = imageSlice.actions;
export default imageSlice.reducer;

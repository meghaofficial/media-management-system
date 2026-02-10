import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface themeState {
  value: string
}

const initialState: themeState = {
  value: "dark"
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
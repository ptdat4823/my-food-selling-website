import { Food } from "@/src/models/Food";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    value: [] as Food[],
    ids: [] as number[],
  },
  reducers: {
    setFavorite: (state, action: PayloadAction<Food[]>) => {
      if (action.payload.length === 0) console.log("empty favorite");
      state.value = action.payload;
      state.ids = action.payload.map((food) => food.id);
    },
    changeFavorite: (state, action: PayloadAction<Food>) => {
      if (state.ids.includes(action.payload.id)) {
        state.ids = state.ids.filter((id) => id !== action.payload.id);
        state.value = state.value.filter(
          (food) => food.id !== action.payload.id
        );
      } else {
        state.ids.push(action.payload.id);
        state.value.push(action.payload);
      }
    },
  },
});

export const { setFavorite, changeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

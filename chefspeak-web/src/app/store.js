import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/recipes/recipeSlice";
import voiceReducer from "../features/voice/voiceSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    voice: voiceReducer,
  },
});

export default store;

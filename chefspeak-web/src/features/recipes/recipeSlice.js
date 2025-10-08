import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipes, saveRecipe } from "../../api/backend";

export const getRecipes = createAsyncThunk("recipes/getRecipes", async () => {
  return await fetchRecipes();
});

export const addRecipe = createAsyncThunk("recipes/addRecipe", async (recipe) => {
  return await saveRecipe(recipe);
});

const recipeSlice = createSlice({
  name: "recipes",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default recipeSlice.reducer;

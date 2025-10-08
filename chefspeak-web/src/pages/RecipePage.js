import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../features/recipes/recipeSlice";
import Recorder from "../components/Recorder";
import StepViewer from "../components/StepViewer";

export default function RecipePage() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.list);
  const transcription = useSelector(state => state.voice.transcription);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (!transcription) return;
    const text = transcription.toLowerCase();
    if (text.includes("next")) setCurrentStep(s => s + 1);
    if (text.includes("previous") || text.includes("back")) setCurrentStep(s => Math.max(0, s - 1));
  }, [transcription]);

  const recipe = recipes[0]; // pick first recipe for demo

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{recipe?.title || "Loading..."}</h1>
      <StepViewer steps={recipe?.steps} currentStep={currentStep} />
      <Recorder />
      <p><strong>Transcription:</strong> {transcription}</p>
    </div>
  );
}

import { createSlice } from "@reduxjs/toolkit";

const voiceSlice = createSlice({
  name: "voice",
  initialState: { transcription: "", recording: false },
  reducers: {
    setTranscription: (state, action) => { state.transcription = action.payload; },
    setRecording: (state, action) => { state.recording = action.payload; },
  },
});

export const { setTranscription, setRecording } = voiceSlice.actions;
export default voiceSlice.reducer;

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setTranscription, setRecording } from "../features/voice/voiceSlice";
import { transcribeAudio } from "../api/backend";

export default function Recorder() {
  const dispatch = useDispatch();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("getUserMedia not supported in this browser.");
      return;
    }
  
    try {
      console.log(navigator.mediaDevices);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        const file = new File([blob], "voice.webm");
        const res = await transcribeAudio(file);
        dispatch(setTranscription(res.transcription));
      };
      recorder.start();
      setMediaRecorder(recorder);
      dispatch(setRecording(true));
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone.");
    }
  };
  
  const stopRecording = () => {
    mediaRecorder.stop();
    dispatch(setRecording(false));
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <button onClick={startRecording} style={{ marginRight: "1rem" }}>🎤 Start</button>
      <button onClick={stopRecording}>⏹ Stop</button>
    </div>
  );
}

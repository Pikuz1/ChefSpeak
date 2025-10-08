export default function StepViewer({ steps, currentStep }) {
    if (!steps || steps.length === 0) return <p>No steps available.</p>;
    return (
      <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Step {currentStep + 1}</h3>
        <p>{steps[currentStep]}</p>
      </div>
    );
  }
  
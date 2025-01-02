"use client";
import usePlannerStore from "@/store/plannerStore";

export default function Planner() {
  const { planner } = usePlannerStore();

  return (
    <div>
      <h1>Generated Planner</h1>
      <pre>{JSON.stringify(planner, null, 2)}</pre>
    </div>
  );
}

import React from 'react';
import { SlClose, SlCheck } from "react-icons/sl";

function Pros({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-primary-300 p-4 pt-5 pb-6 text-black md:w-1/2" style={{ border: "1px solid #0c63db" }}>
      <div className="w-full justify-center flex mb-3">
        <SlCheck size="36px" style={{ strokeWidth: "1px" }} color="#0c63db" />
      </div>
      <h3 className="mb-4 text-center font-basier text-lg font-semibold">When to use</h3>
      <ul className="ml-4 flex list-disc flex-col gap-y-2">
        {children}
      </ul>
    </div>
  );
}

function Cons({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-4 pt-5 pb-6 md:w-1/2" style={{ border: "1px solid #cbd5e1" }}>
      <div className="w-full justify-center flex mb-3">
        <SlClose size="36px" color="#64748b" />
      </div>
      <h3 className="mb-4 text-center font-basier text-lg font-semibold">When NOT to use</h3>
      <ul className="ml-4 flex list-disc flex-col gap-y-2">
        {children}
      </ul>
    </div>
  );
}

export default function ComparisonBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 my-8 md:flex-row">
      {children}
    </div>
  );
}

ComparisonBox.Pros = Pros;
ComparisonBox.Cons = Cons;

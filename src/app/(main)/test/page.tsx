"use client";
import React, { useEffect, useRef } from "react";

const TestPage = () => {
  return (
    <div
      className="h-screen w-full bg-blue-200 overflow-y-scroll scrollbar"
      onScroll={(e) => {
        console.log("scrolling", e);
      }}
    >
      <h1>Test page</h1>
      <div className="w-[400px] h-[1200px] bg-red-200"></div>
    </div>
  );
};

export default TestPage;

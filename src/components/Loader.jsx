import React from "react";

export default function Loader() {
  return (
   
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-lg">Loading...</p>
      </div>
    
  );
}

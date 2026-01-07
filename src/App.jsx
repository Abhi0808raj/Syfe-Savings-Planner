import { useState } from "react";
import Header from "./components/Common/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import LoadingSpinner from "./components/Common/LoadingSpinner";

function App() {
  return (
    <div className="min-h-screen py-8 w-screen px-6 sm:px-6 lg:px-8"> 
      <div className="">
        {/* Header */}
        <Header/>
        {/* Dashboard */}
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import Header from "./components/Common/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import { useGoals } from "./hooks/useGoals";
import { useExchangeRate } from "./hooks/useExchangeRate";

function App() {
  const { goals, loading: goalsLoading } = useGoals();
  const { exchangeRate, loading: rateLoading, lastUpdated, fetchExchangeRate } = useExchangeRate();

  const loading = goalsLoading || rateLoading;

  return (
    <div className="min-h-screen py-8 w-screen px-6 sm:px-6 lg:px-8">
      <div className="">
        <Header />
        <Dashboard
          goals={goals}
          exchangeRate={exchangeRate || 90}
          lastUpdated={lastUpdated}
          refreshRate={fetchExchangeRate}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;

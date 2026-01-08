import React from "react";
import {
  TrendingUp,
  Target,
  Wallet,
  RefreshCw,
  ArrowRightLeft,
  Divide,
} from "lucide-react";
import {
  formatCurrency,
  convertToINR,
  calculateSaved,
  calculateProgress,
} from "../../utils/currency";

const Dashboard = ({
  goals,
  exchangeRate,
  lastUpdated,
  refreshRate,
  loading,
}) => {
  const calculateTotals = () => {
    let totalTarget = 0;
    let totalSaved = 0;
    goals.forEach((goal) => {
      const targetInINR = convertToINR(
        Number(goal.targetAmount),
        goal.currency,
        exchangeRate
      );
      const savedInGoalCurrency = calculateSaved(
        goal.contributions,
        goal.currency,
        exchangeRate
      );
      const savedInINR = convertToINR(
        savedInGoalCurrency,
        goal.currency,
        exchangeRate
      );
      totalTarget += targetInINR;
      totalSaved += savedInINR;
    });
    return { totalTarget, totalSaved };
  };
  const { totalTarget, totalSaved } = calculateTotals();
  const overallProgress = calculateProgress(totalSaved, totalTarget);

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return "Never";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minute(s) ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour(s) ago`;
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // console.log("Goals:", goals);

  return (
    <div className=" bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-gray-700" size={20}/>
          <h2 className="text-xl font-semibold text-gray-800">Financial Overview</h2>
        </div>

        <button onClick={refreshRate} className="flex items-center gap-2 px-3 peer-odd:y-2 border rounded-md text-sm text-green-700 bg-green-200 hover:bg-green-100">
          <RefreshCw size={16}/>
          Refresh Rates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mb-6">
        <div className="border rounded-md p-4 bg-blue-50">
          <Target className="mb-2 text-blue-700"/>
          <p className="text-sm text-black">Total Target</p>
          <p className="text-2xl text-blue-500 font-semibold ">{formatCurrency(totalTarget, "INR")}</p>
          <p className="text-sm text-black">{formatCurrency(totalTarget / exchangeRate || 0, "USD")}</p>
        </div>

        <div className="border rounded-md p-4 bg-yellow-50">
          <Wallet className="mb-2 text-yellow-500 bg-ye"/>
          <p className="text-sm text-black">Total Saved</p>
          <p className="text-2xl font-semibold text-yellow-500">{formatCurrency(totalSaved, "INR")}</p>
          <p className="text-sm text-black">{formatCurrency(totalSaved / exchangeRate ||0, "USD")}</p>
        </div>
        <div className="border rounded-md p-4 bg-pink-50">
          <TrendingUp className="mb-2 text-pink-500"/>
          <p className="text-sm text-black">Overall Progress</p>
          <p className="text-2xl font-semibold text-pink-500">{overallProgress}%</p>
          <p className="text-sm text-black">Total goals completion</p>
        </div>
      </div>

      <div className="border rounded-md p-4 flex items-start gap-3">
        <ArrowRightLeft className="text-gray-600 mt-1" />
        <p className="text-sm text-gray-700 mt-1.5">Exchange Rate: 1 USD= {formatCurrency(exchangeRate || 0, "INR")}</p>
        <p className="text-xs text-gray-400 mt-2">Last updated: {formatLastUpdated(lastUpdated)}</p>
      </div>
    </div>
  );
};

export default Dashboard;

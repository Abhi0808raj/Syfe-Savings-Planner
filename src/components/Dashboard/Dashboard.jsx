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
        goal.targetAmount,
        goal.currency,
        exchangeRate
      );
      const savedInINR = convertToINR(
        goal.savedAmount,
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

  return (
    <div>
      <div>
        <div>
          <TrendingUp />
          <h2>Financial Overview</h2>
        </div>

        <button onClick={refreshRate}>
          <RefreshCw />
          Refresh Rates
        </button>
      </div>
      <div>
        {/* Total Target */}
        <div>
          <Target />
          <p>Total Target</p>
          <p>{formatCurrency(totalTarget, "INR")}</p>
          <p>{formatCurrency(totalTarget / exchangeRate || 90, "USD")}</p>
        </div>
        {/* Total Saved */}
        <div>
          <Wallet />
          <p>Total Saved</p>
          <p>{formatCurrency(totalSaved, "INR")}</p>
          <p>{formatCurrency(totalSaved / exchangeRate || 90, "USD")}</p>
        </div>

        {/* Overall Progress */}
        <div>
          <TrendingUp />
          <p>Overall Progress</p>
          <p>{overallProgress}%</p>
          <p>Total goals completion</p>
        </div>
      </div>
      {/* Exchange Rate Info */}
      <div>
        <ArrowRightLeft />
        <p>Exchange Rate: 1 USD= {formatCurrency(exchangeRate || 90, "INR")}</p>
        <p>Last updated: {formatLastUpdated(lastUpdated)}</p>
      </div>
    </div>
  );
};

export default Dashboard;

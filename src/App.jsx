import { useState } from "react";
import Header from "./components/Common/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { useGoals } from "./hooks/useGoals";
import { useExchangeRate } from "./hooks/useExchangeRate";
import AddGoalForm from "./components/GoalCard/AddGoalForm";
import GoalCard from "./components/GoalCard/GoalCard";
import AddContributionModal from "./components/Modals/AddContributionModal";

function App() {
  const { goals,addGoal, loading: goalsLoading, addContribution, deleteGoal } = useGoals();
  const { exchangeRate, loading: rateLoading, lastUpdated, fetchExchangeRate } = useExchangeRate();


  const loading = goalsLoading || rateLoading;
  const handleAddGoal=(goalData)=>{
    addGoal(goalData);
  }
  const handleDelete=(goalId)=>{
    deleteGoal(goalId);
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleOnClose=()=>{ setModalOpen(false); setSelectedGoal(null); }
  const handleAddContribution=(goalId,contributionData)=>{addContribution(goalId,contributionData);}

  const handleOpenContribution=(goal)=>{
    setSelectedGoal(goal);
    setModalOpen(true);
  }

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
        <AddGoalForm onAddGoal={handleAddGoal} />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.length === 0 ? (
              <p className="col-span-full text-gray-500">No goals yet. Add your first goal.</p>
            ) : (
              goals.map((g) => (
                <GoalCard
                  key={g.id}
                  goal={g}
                  exchangeRate={exchangeRate || 90}
                  onAddContribution={() => handleOpenContribution(g)}
                  onDeleteGoal={() => handleDelete(g.id)}
                />
              ))
            )}
          </div>
        <AddContributionModal
          isOpen={modalOpen}
          onClose={handleOnClose}
          goal={selectedGoal}
          exchangeRate={exchangeRate || 90}
          onAddContribution={handleAddContribution}
        />
      </div>
    </div>
  );
}

export default App;

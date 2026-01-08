import { Target } from "lucide-react";

const Header = ({}) => {
  return (
    <header className="glass-card rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600">
            <Target className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Syfe Savings Planner</h1>
            <p className="text-sm text-gray-500">
              Track your financial goals and build your future
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

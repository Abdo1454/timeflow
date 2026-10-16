
import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../layouts/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <DashboardLayout />
      </main>
    </div>
  );
}

export default App;

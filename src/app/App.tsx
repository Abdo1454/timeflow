
import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../layouts/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 md:block position-fixed">
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

import Header from "./Header";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-6">
        {<DashboardPage/>}
      </main>
    </div>
  );
}
import { useState } from "react";
import Sidebar from "../../../layouts/Sidebar";
import Header from "../../../layouts/Header";
// import TasksHeader from "../components/TasksHeader";

export default function MyTasksPage() {
//   const [searchQuery, setSearchQuery] = useState("");
   const [searchQuery, setSearchQuery] = useState("");

  function handleAddTaskClick() {
    // هنربطها بمودال إضافة المهمة بعدين
    console.log("Add task clicked");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
         {/* Sidebar */}
              <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white md:block">
                <Sidebar />
              </aside>
        
              {/* Main Content */}
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <header className="z-50 shrink-0">
                  <Header
                    onAddTaskClick={() => handleAddTaskClick()}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </header>

    </div>
    {/* <TasksHeader /> */}
    </div>
  )
}

import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Code2,
  Dumbbell,
  GlassWater,
  Flame,
  Check,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
type Habit  = {
    id:number,
    title:string,
      icon: "reading" | "water" | "coding" | "workout";
  streak: number;
  completed: boolean;
};
const initialHabits : Habit[] =[
    {
        id:1,
          title: "Read for 20 minutes",
    icon: "reading",
    streak: 5,
    completed: true,
    },
    {
    id: 2,
    title: "Drink 8 glasses of water",
    icon: "water",
    streak: 3,
    completed: false,
  },
  {
    id: 3,
    title: "Practice coding",
    icon: "coding",
    streak: 7,
    completed: true,
  },
  {
    id: 4,
    title: "Morning workout",
    icon: "workout",
    streak: 2,
    completed: false,
  },
];

const STORAGE_KEY = "timeFlow-habits";
const habitIcons = {
  reading: BookOpen,
  water: GlassWater,
  coding: Code2,
  workout: Dumbbell,
};
export default function HabitsSection() {
    const [habits , setHabits] =useState<Habit[]>(()=>{
        try{
            const saved = localStorage.getItem(STORAGE_KEY);
            if(saved){
                 const parsed: unknown = JSON.parse(saved);
                   if (Array.isArray(parsed)) {
          return parsed as Habit[];
        }
    }
            
        } catch(error){
            console.error("Failed to load habits:", error);
        }
        return initialHabits;
    })
      const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitTitle, setNewHabitTitle] = useState("");
   useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error("Failed to save habits:", error);
    }
  }, [habits]);
  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;
    const progress = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;
   function toggleHabit(id: number) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  }
  function addHabit(event :React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const title = newHabitTitle.trim();
      setHabits((currentHabits) => [
      ...currentHabits,
      {
        id: Date.now(),
        title,
        icon: "reading",
        streak: 0,
        completed: false,
      },
    ]);
      setNewHabitTitle("");
    setShowAddHabit(false);
  }
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="w-full flex  gap-5">
        <h3 className="text-base font-semibold text-gray-900">Habit Consistency</h3>
        <NavLink to="/habits" className="shrink-0 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 ml-auto" >Manage</NavLink>
        </div>
             <button
          type="button"
          onClick={() => setShowAddHabit((open) => !open)}
          aria-label="Add a habit"
          className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Plus size={18} />
        </button>
         {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Today's progress
          </span>
          <span className="font-semibold text-indigo-600">
            {completedCount} of {habits.length}
          </span>
        </div>
             <div
          className="h-2 overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
          aria-label="Daily habits progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
           </div>
      </div>
        {/* Add Habit Form */}
      {showAddHabit && (
        <form onSubmit={addHabit} className="mt-4 flex gap-2">
          <input
            value={newHabitTitle}
            onChange={(event) => setNewHabitTitle(event.target.value)}
            placeholder="Enter a habit..."
            aria-label="New habit title"
            autoFocus
            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Add
          </button>
        </form>
      )}
       {/* Habit List */}
      <div className="mt-4 divide-y divide-gray-100">
        {habits.map((habit) => {
          const Icon = habitIcons[habit.icon];

          return (
            <div
              key={habit.id}
              className="flex items-center gap-3 py-4"
            >
              <div
                className={`rounded-xl p-2.5 ${
                  habit.completed
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    habit.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {habit.title}
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                  <Flame size={13} className="text-orange-400" />
                  {habit.streak} day streak
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleHabit(habit.id)}
                aria-label={
                  habit.completed
                    ? `Mark ${habit.title} incomplete`
                    : `Complete ${habit.title}`
                }
                aria-pressed={habit.completed}
                className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition ${
                  habit.completed
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-gray-300 text-transparent hover:border-indigo-500"
                }`}
              >
                <Check size={15} />
              </button>
            </div>
          );
        })}
      </div>

      {habits.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          No habits yet. Add your first habit!
        </p>
      )}
    </section>
  )
}

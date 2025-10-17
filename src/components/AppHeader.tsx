import { useEffect } from "react"
import { Sun, Moon, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/context/ThemeContext"

export default function AppHeader() {
  const { darkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    const root = window.document.documentElement
    if (darkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <header className="flex justify-end items-center px-6 py-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Sun
            size={18}
            className={`transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-yellow-400"
            }`}
          />

          <div
            onClick={toggleDarkMode}
            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
              darkMode ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            <div
              className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>

          <Moon
            size={18}
            className={`transition-colors duration-300 ${
              darkMode ? "text-yellow-400" : "text-gray-400"
            }`}
          />
        </div>

        {/* 🔔 Notifikasi */}
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bell size={18} />
        </button>

        {/* 👤 User Info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/100?img=12" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Admin
          </span>
        </div>
      </div>
    </header>
  )
}

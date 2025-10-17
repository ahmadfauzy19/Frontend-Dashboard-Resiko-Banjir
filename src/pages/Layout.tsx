import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import AppHeader from "@/components/AppHeader"
import { useTheme } from "@/context/ThemeContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { darkMode } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <SidebarProvider>
      <div
        className={`flex min-h-screen w-full transition-colors duration-500 ${
          darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        {/* Sidebar - Menerima dan mengelola state isCollapsed */}
        <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Konten Utama - Menggunakan padding atau margin yang menyesuaikan dengan isCollapsed */}
        <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
          {/* Header - Menerima state untuk menyesuaikan breadcrumbs/padding jika diperlukan */}
          <AppHeader />

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
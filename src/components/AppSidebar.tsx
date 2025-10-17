import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  ChevronDown,
  ChevronRight,
  Home,
  ChevronLeft,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AppSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

// 💡 Gunakan props
export function AppSidebar({ isCollapsed, setIsCollapsed }: AppSidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>("Beranda")

  const toggleMenu = (menu: string) => {
    // Hanya izinkan toggling menu jika sidebar tidak collapsed
    if (isCollapsed) return 
    setOpenMenu(openMenu === menu ? null : menu)
  }

  const toggleSidebar = () => {
    if (!isCollapsed) setOpenMenu(null)
    setIsCollapsed(!isCollapsed) // Menggunakan prop setIsCollapsed
  }

  return (
    <div
      className={`relative h-full transition-all duration-300 dark:border-gray-800 bg-white dark:bg-gray-900 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
    <div className="h-full">
        <Sidebar>
          <div
            className={`flex items-center py-6 border-gray-200 dark:border-gray-800 transition-all duration-300 ${
              isCollapsed ? "justify-start px-6 py-6" : "justify-start px-10"
            }`}
          >
            <img
              src="/logo-jabar.png"
              alt="Logo Jabar"
              className={`object-contain transition-all duration-300 ${
                isCollapsed ? "w-8 h-8" : "w-10 h-10" 
              }`}
            />
            {!isCollapsed && (
              <div
                className="leading-[20px] ml-3" 
                style={{ fontFamily: "Intro, sans-serif" }}
              >
                <div className="text-[14px] font-bold text-gray-700 dark:text-gray-300">
                  DASHBOARD
                </div>
                <div className="text-[26px] font-bold text-gray-900 dark:text-white">
                  JABAR
                </div>
              </div>
            )}
          </div>

          {/*Menu Sidebar */}
          <SidebarContent className="flex flex-col justify-start items-center px-3 pt-4">
            <SidebarGroup className="w-full">
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* Menu Beranda */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => toggleMenu("Beranda")}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        openMenu === "Beranda" && !isCollapsed
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        {!isCollapsed && <span>Beranda</span>}
                      </div>
                      {!isCollapsed &&
                        (openMenu === "Beranda" ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        ))}
                    </SidebarMenuButton>

                    {/* Submenu */}
                    <AnimatePresence>
                      {!isCollapsed && openMenu === "Beranda" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-1 ml-8 flex flex-col gap-1"
                        >
                          <a
                            href="#"
                            className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-600 transition"
                          >
                            • Mitigasi Banjir
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </div>
  )
}
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Leaf, 
  Sprout, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tanaman", href: "/tanaman", icon: Leaf },
  { name: "Budidaya", href: "/budidaya", icon: Sprout },
  { name: "Artikel", href: "/artikel", icon: FileText },
  { name: "Kontak", href: "/kontak", icon: MessageSquare },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out",
          "flex flex-col shadow-elevated",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-sidebar-primary" />
            <span className="text-2xl font-bold">PETHOFAR</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-medium">
              AU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin Utama</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">admin@pethofar.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

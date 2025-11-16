import { Menu, LogOut, User } from "lucide-react";
import { content } from "../lib/content";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const handleLogout = () => {
    // Mock logout - in real app, this would clear auth state
    if (confirm(content.ui.logoutConfirm)) {
      alert(content.ui.logoutSuccess);
    }
  };

  return (
    <nav className="bg-white border-b border-noir-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-noir-black hover:bg-noir-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Spacer for mobile */}
        <div className="lg:hidden flex-1" />

        {/* Right side - User info and logout */}
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-noir-gray-200 flex items-center justify-center">
              <User size={20} className="text-noir-gray-600" />
            </div>
            <span className="hidden md:block font-sans text-sm text-noir-gray-700">
              {content.ui.admin}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-noir-gray-100 hover:bg-noir-gray-200 text-noir-black rounded-lg transition-all duration-200 font-sans text-sm"
          >
            <LogOut size={16} />
            <span>{content.ui.logout}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

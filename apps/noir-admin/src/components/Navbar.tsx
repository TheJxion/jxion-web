import { Menu, LogOut, User } from 'lucide-react';
import { content } from '../lib/content';
import styles from './Navbar.module.scss';

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
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className={styles.menuButton}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Spacer for mobile */}
        <div className={styles.spacer} />

        {/* Right side - User info and logout */}
        <div className={styles.rightSection}>
          {/* User Avatar */}
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <span className={styles.userName}>{content.ui.admin}</span>
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut size={16} />
            <span>{content.ui.logout}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

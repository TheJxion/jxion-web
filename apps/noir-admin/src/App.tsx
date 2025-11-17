import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Finance from './pages/Finance';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import Translations from './pages/Translations';
import ContentEditor from './pages/ContentEditor';
import StylesEditor from './pages/StylesEditor';
import TemplatesEditor from './pages/TemplatesEditor';
import ComponentGenerator from './pages/ComponentGenerator';
import styles from './styles/App.module.scss';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className={styles.app}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className={styles.mainContent}>
          <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/translations" element={<Translations />} />
              <Route path="/content" element={<ContentEditor />} />
              <Route path="/styles" element={<StylesEditor />} />
              <Route path="/templates" element={<TemplatesEditor />} />
              <Route path="/components" element={<ComponentGenerator />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

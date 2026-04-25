import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { RetroBackground } from './components/RetroBackground/RetroBackground.jsx';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.shell}>
      <RetroBackground />
      <a className={styles.skip} href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

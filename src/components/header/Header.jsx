import { NavLink } from 'react-router-dom';
import { FaEuroSign, FaCalculator } from 'react-icons/fa';

import SwitchColorMode from '../switch-color-mode/SwitchColorMode';

function Header() {
  return (
    <header>
      <div className="navbar">
        <div className="icon">
          <FaCalculator className="calculator" />
          <FaEuroSign className="euro" />
        </div>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-current={({ isActive }) => (isActive ? 'page' : null)}
            aria-label="Accueil de la calculatrice"
          >
            Calculatrice
          </NavLink>
          <NavLink
            to="/informations"
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-current={({ isActive }) => (isActive ? 'page' : null)}
            aria-label="Informations sur la calculatrice etles cultures de pourboires"
          >
            Informations
          </NavLink>
        </nav>
      </div>
      <SwitchColorMode />
    </header>
  );
}

export default Header;

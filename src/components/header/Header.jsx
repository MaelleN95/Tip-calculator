import { NavLink } from 'react-router-dom';
import { FaEuroSign, FaCalculator } from 'react-icons/fa';

function Header() {
  return (
    <header>
      <div className="navbar">
        <div className="icon">
          <FaCalculator className="calculator" />
          <FaEuroSign className="euro" />
        </div>

        <nav>
          <NavLink to="/">Calculatrice</NavLink>
          <NavLink to="/informations">Informations</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
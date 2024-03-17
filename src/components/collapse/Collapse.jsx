import { useState } from 'react';

import { FaChevronDown } from 'react-icons/fa';

function Collapse({ title, flag, currencyUnit, children }) {
  const [open, updateOpen] = useState(false);

  const toggleOpen = () => {
    updateOpen(!open);
  };

  return (
    <div>
      <div
        className={
          open ? 'collapse__close collapse__close--clicked' : 'collapse__close'
        }
        onClick={toggleOpen}
      >
        <img src={flag} alt={`Drapeau ${title}`} />
        <h3>{title}</h3>

        <FaChevronDown
          className={
            open
              ? 'collapse__close__arrow collapse__close__arrow--open'
              : 'collapse__close__arrow collapse__close__arrow--close'
          }
        />
      </div>
      <div
        className={
          open
            ? 'collapse__txt collapse__txt--open'
            : 'collapse__txt collapse__txt--hidden'
        }
      >
        <p>Devise du pays : {currencyUnit}</p>
        {children}
      </div>
    </div>
  );
}

export default Collapse;

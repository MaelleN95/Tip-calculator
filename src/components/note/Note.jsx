import { useState } from 'react';

import { IoMdInformationCircle } from 'react-icons/io';

function Note({ direction, children, title, openSetting }) {
  const [open, updateOpen] = useState(openSetting);

  const toggleOpen = () => {
    updateOpen(!open);
  };

  return (
    <div
      className={
        open
          ? `note note--${direction} note--${direction}--open`
          : `note note--${direction}`
      }
    >
      <IoMdInformationCircle
        title={title}
        className="note__icon"
        onClick={toggleOpen}
        tabIndex={0}
      />
      <div
        className="note__indication"
        style={open ? { display: 'block' } : { display: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

export default Note;

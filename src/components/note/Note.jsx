import { useState } from 'react';

import { IoMdInformationCircle } from 'react-icons/io';

/**
 * Note component for displaying information.
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {string} props.direction - The direction of the note (vertical/horizontal).
 * @param {ReactNode} props.children - The content of the note.
 * @param {string} props.title - The title of the note (the "title" attribute).
 * @param {boolean} props.openSetting - The initial open state of the note.
 * @returns {JSX.Element} The rendered Note component.
 */
function Note({ direction, children, title, openSetting }) {
  // State to manage open/close state of the note
  const [open, updateOpen] = useState(openSetting);

  // Function to toggle open/close state of the note
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
      {/* Icon for indicating the note */}
      <IoMdInformationCircle
        title={title}
        aria-label={title}
        className="note__icon"
        onClick={toggleOpen}
        tabIndex={0}
      />

      {/* Content of the note */}
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

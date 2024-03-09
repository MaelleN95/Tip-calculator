import { useState } from 'react';

function Note() {
  const [open, updateOpen] = useState(false);

  const toggleOpen = () => {
    updateOpen(!open);
  };

  return (
    <>
      <div onClick={toggleOpen}>?</div>
      <div style={open ? { display: 'block' } : { display: 'none' }}>
        Informations sur l&apos;utilisation de la calculatrice à venir...
      </div>
    </>
  );
}

export default Note;

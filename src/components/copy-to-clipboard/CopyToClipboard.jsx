import { useState } from 'react';

import { FaRegClipboard, FaCheck } from 'react-icons/fa';

function CopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const email = 'nioche.maelle@gmail.com';
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3500);
      })
      .catch((error) =>
        console.error('Erreur lors de la copie dans le presse-papiers :', error)
      );
  };
  return (
    <button
      onClick={copyToClipboard}
      className={copied ? 'copy-to-clipboard copied' : 'copy-to-clipboard'}
    >
      {copied ? (
        <span className="tooltip tooltip--copied">Copié !</span>
      ) : (
        <span className="tooltip">
          Copier l&apos;email dans le presse-papier
        </span>
      )}
      {copied ? <FaCheck /> : <FaRegClipboard />}
    </button>
  );
}

export default CopyToClipboard;

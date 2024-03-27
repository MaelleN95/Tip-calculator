import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <main className="error-page">
      <img
        src="/error.svg"
        alt="Personnage ayant une erreur sur son ordinateur"
        height={'400px'}
      />
      <p>
        <span>Oups !</span> <br /> Une erreur s&apos;est produite.
      </p>
      <div className="center">
        <Link to="/" className="redirect">
          Retourner sur la page d&apos;accueil
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;

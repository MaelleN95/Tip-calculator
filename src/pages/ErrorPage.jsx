import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="error-page">
      <img src="/error.svg" alt="error" />
      <p>
        <span>Oups !</span> <br /> Une erreur s&apos;est produite.
      </p>
      <div className="center">
        <Link to="/" className="redirect">
          Retourner sur la page d&apos;accueil
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;

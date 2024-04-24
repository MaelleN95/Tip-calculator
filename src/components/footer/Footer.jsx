import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <section className="about-development">
        <div className="about-development--text">
          <p>Développé par Maëlle Nioche © {new Date().getFullYear()}</p>
          <p>
            Ce site est open source et ne récolte aucune donnée. Consultez le
            code source sur{' '}
            <a
              href="https://github.com/MaelleN95/Tip-calculator"
              target="_blank"
              rel="noopener noreferrer"
              title='Ouvrir le dépôt GitHub de "tip-calculator" dans un nouvel onglet'
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/maelle-nioche/"
              target="_blank"
              rel="noopener noreferrer"
              title="Ouvrir le profil LinkedIn de Maëlle Nioche dans un nouvel onglet"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/MaelleN95"
              target="_blank"
              rel="noopener noreferrer"
              title="Ouvrir le profil GitHub de Maëlle Nioche dans un nouvel onglet"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </section>
      <hr />
      <section className="about">
        <h2>A PROPOS</h2>
        <p>
          <strong>Mentions Légales:</strong> Tous les droits sur le contenu de
          ce site sont réservés à Maëlle Nioche. <br /> Sauf indication
          contraire, tout le contenu est la propriété intellectuelle de Maëlle
          Nioche. L&apos;utilisation non autorisée du contenu de ce site est
          strictement interdite.
        </p>
        <p>
          Retrouvez plus de taux sur{' '}
          <a
            href="https://taux.live/"
            target="_blank"
            rel="noopener noreferrer"
            title='Ouvrir le site "taux.live" dans un nouvel onglet'
          >
            taux.live
          </a>
          .
        </p>
        <p>
          Retrouvez plus d&apos;illustrations sur{' '}
          <a
            href="https://storyset.com/"
            target="_blank"
            rel="noopener noreferrer"
            title='Ouvrir le site "storyset" dans un nouvel onglet'
          >
            Storyset
          </a>
          .
        </p>
      </section>
    </footer>
  );
}

export default Footer;

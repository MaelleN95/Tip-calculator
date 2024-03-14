import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      Developped by Maëlle Nioche
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/maelle-nioche/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/MaelleN95"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;

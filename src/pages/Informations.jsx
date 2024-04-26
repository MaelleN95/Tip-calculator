import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Note from '../components/note/Note';
import Collapse from '../components/collapse/Collapse';
import CopyToClipboard from '../components/copy-to-clipboard/CopyToClipboard';

import { FaLinkedin } from 'react-icons/fa';

import countries from '../assets/countries.json';
import allCountries from '../assets/allCountries.json';

function Informations() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const anchor = document.getElementById(location.hash.substring(1)); // Récupérer l'élément avec l'ID de l'ancre
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  const onSubmit = async (data) => {
    data.preventDefault();

    setSelectedCountry(data.target.addCountry.value);

    const email = 'nioche.maelle@gmail.com';
    const subject = `Demande d'ajout du pays : ${selectedCountry}`;
    const body = `Bonjour,\n\nJe souhaite que ${selectedCountry} soit ajouté dans le site de calculatrice de pourboire.\n\nMerci !\n\n\n\n- Email généré depuis TipCalculator -
    \n\n- Merci de votre visite sur le site de calculatrice de pourboire ! -\n- N'hésitez pas à me contacter pour toute question ou suggestion. -\n\n- Maelle Nioche -\n- Développeuse web front-end -`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="informations">
      <h1>Informations</h1>
      <nav className="table-of-contents">
        <ul>
          <li>
            <a href="#goal">Objectif</a>
          </li>
          <li>
            <a href="#operation">Comment fonctionne la calculatrice ?</a>
          </li>
          <li>
            <a href="#culture">Les différentes cultures et les pourboires</a>
          </li>
          <li>
            <a href="#website-improvement">Pour améliorer le site</a>
          </li>
        </ul>
      </nav>
      <section id="goal">
        <h2>Objectif</h2>
        <div>
          <ul>
            <li>
              <strong>Marre de faire des recherches</strong> avant de partir en
              voyage pour se renseigner sur la culture des pourboires de votre
              destination ?
            </li>
            <li>
              <strong>Marre de devoir faire des calculs</strong> pour savoir
              combien vous devez laisser de pourboire ?
            </li>
            <li>
              <strong>Marre de ne pas vous y retrouver</strong> avec les
              différentes monnaies ?
            </li>
          </ul>
          <img
            src="/currency-animed-negative.svg"
            alt="Un homme qui se questionne devant une calculatrice"
          />
        </div>
        <p>
          Ne vous inquiétez plus,{' '}
          <strong>cette calculatrice est faite pour vous</strong> !
        </p>
        <p>Nous avons rassemblé dans un même endroit :</p>
        <div>
          <img
            src="/currency-animed-positive.svg"
            alt="Une femme qui sourit entourée de symboles de devises"
          />
          <ul>
            <li>
              les <strong>recherches sur la culture des pourboires</strong> de
              vos destinations favorites pour ainsi vous{' '}
              <strong>conseiller</strong> sur les bonnes pratiques,
            </li>
            <li>
              la possibilité de <strong>calculer un pourboire</strong> avec le
              pourcentage que vous souhaitez,
            </li>
            <li>
              et la <strong>conversion dans votre devise</strong>.
            </li>
          </ul>
        </div>
      </section>
      <section id="operation">
        <h2>Comment fonctionne la calculatrice ?</h2>
        <p>Pour utiliser la calculatrice de pourboire, rien de plus simple :</p>
        <ol>
          <li>
            Sélectionnez parmi la liste{' '}
            <strong>le pays où vous vous apprêtez à faire un pourboire</strong>{' '}
            :
            <Note direction="horizontal" openSetting={true}>
              Une fois choisie, une petite information dans le même format que
              celle-ci, s’affichera en dessous pour vous indiquer le pourcentage
              de pourboire moyen du pays <strong>pour vous conseiller</strong>.
              Vous pouvez choisir de suivre ces conseils, ou de sélectionner
              votre propre pourcentage.
            </Note>
          </li>
          <li>
            Indiquez <strong>le montant de l’addition</strong> que vous vous
            apprêtez à régler.
          </li>
          <li>
            Indiquez le <strong>pourcentage de pourboire</strong> que vous
            souhaitez laisser. Par défaut, le pourcentage conseillé sera choisi.
          </li>
          <li>
            Si vous êtes plusieurs à régler l’addition et que{' '}
            <strong>vous souhaitez partager le pourboire</strong>, indiquez le
            nombre de personnes.
          </li>
          <li>
            Et enfin, cliquez sur le bouton{' '}
            <strong>&quot;Calculer&quot;</strong>.
          </li>
        </ol>
        <Note direction="horizontal" openSetting={true}>
          Une fois le calcul effectué, vous obtiendrez le montant du pourboire à
          laisser, ainsi que le montant total de l’addition dans votre{' '}
          <strong>devise habituelle</strong>. Par défaut, la devise habituelle
          est <strong>l’Euro (€)</strong>. Vous pouvez changer cette devise dans
          le menu déroulant dans la section Résultat de la calculatrice.
        </Note>
      </section>
      <section id="culture">
        <h2>Les différentes cultures et les pourboires</h2>
        {countries.map((country, i) => (
          <Collapse
            key={`${country.country}-${i}`}
            title={country.country}
            flag={country.flag}
            currencyUnit={country.currencyUnit}
          >
            {country.culture}
          </Collapse>
        ))}
      </section>
      <section id="website-improvement">
        <img
          src="/Coffee-shop-pana.svg"
          alt="Illustration d’un café avec deux personnes assises à une table, l’une buvant du café et l’autre en conversation, et un barista derrière le comptoir avec une machine à café."
          className="coffee-shop-cover"
        />
        <h2>Pour améliorer le site</h2>
        <p>
          Si vous avez des suggestions pour améliorer le site, n’hésitez pas à
          me contacter :
        </p>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/maelle-nioche/"
              target="_blank"
              rel="noopener noreferrer"
              title="Ouvrir le profil LinkedIn de Maëlle Nioche dans un nouvel onglet"
            >
              <FaLinkedin />
              Mon LinkedIn
            </a>
          </li>
          <li className="email">
            <CopyToClipboard />
            <a
              href={`mailto:nioche.maelle@gmail.com?subject=${encodeURIComponent(
                "Suggestion d'amélioration du site de calculatrice de pourboire"
              )}`}
              title="Envoyer un email à Maëlle Nioche"
            >
              Mon adresse e-mail
            </a>
          </li>
        </ul>
        <form onSubmit={onSubmit}>
          <label htmlFor="addCountry">
            Si vous souhaitez qu&apos;un pays soit ajouté, sélectionnez-le dans
            cette liste :
            <select
              name="addCountry"
              id="addCountry"
              onChange={handleCountry}
              required
            >
              <option value="">-- Choisissez un pays --</option>
              {allCountries.map((country, i) => (
                <option key={`${country}-${i}`} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
          <div className="center">
            <button type="submit" disabled={!selectedCountry}>
              Je veux ce pays !
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Informations;

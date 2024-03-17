import Note from '../components/note/Note';
import Collapse from '../components/collapse/Collapse';

import countries from '../assets/countries.json';
import allCountries from '../assets/allCountries.json';

function Informations() {
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
        <ul>
          <li>
            Marre de faire des recherches avant de partir en voyage pour se
            renseigner sur la culture des pourboires de votre destination ?
          </li>
          <li>
            Marre de devoir faire des calculs pour savoir combien vous devez
            laisser de pourboire ?
          </li>
          <li>
            Marre de ne pas vous y retrouver avec les différentes monnaies ?
          </li>
        </ul>
        <p>Ne vous inquiétez plus, cette calculatrice est faite pour vous !</p>
        <p>Nous avons rassemblé dans un même endroit :</p>
        <ul>
          <li>
            les <strong>recherches sur la culture des pourboires</strong> de vos
            destinations favorites pour ainsi vous <strong>conseiller</strong>{' '}
            sur les bonnes pratiques,
          </li>
          <li>
            la possibilité de <strong>calculer un pourboire</strong> avec le
            pourcentage que vous souhaitez,
          </li>
          <li>
            et la <strong>conversion dans votre devise</strong>.
          </li>
        </ul>
      </section>
      <section id="operation">
        <h2>Comment fonctionne la calculatrice ?</h2>
        <p>Pour utiliser la calculatrice de pourboire, rien de plus simple :</p>
        <ol>
          <li>
            Sélectionnez votre devise habituelle, celle avec laquelle vous avez
            l’habitude de payer dans votre pays.
          </li>
          <li>
            Choisissez parmi la liste la devise du pays où vous vous apprêtez à
            faire un pourboire :
            <Note direction="horizontal" openSetting={true}>
              Une fois choisie, une petite information dans le même format que
              celle-ci, s’affichera en dessous pour vous indiquer le pourcentage
              de pourboire habituel du pays pour vous conseiller. Vous pouvez
              choisir de suivre ces conseils, ou de choisir votre propre
              pourcentage.
            </Note>
          </li>
          <li>
            Indiquez le montant de l’addition que vous vous apprêtez à régler.
          </li>
          <li>
            Indiquez le pourcentage de pourboire que vous souhaitez laisser. Par
            défaut, le pourcentage conseillé sera choisi.
          </li>
          <li>
            Si vous êtes plusieurs à régler l’addition et que vous souhaitez
            partager le pourboire, indiquez le nombre de personnes.
          </li>
          <li>Et enfin, cliquez sur le bouton &quot;Calculer&quot;.</li>
        </ol>
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
        <h2>Pour améliorer le site</h2>
        <p>
          Si vous avez des suggestions pour améliorer le site, n’hésitez pas à
          nous contacter :
        </p>
        <ul>
          <li>Mon LinkedIn</li>
          <li>Mon adresse e-mail</li>
        </ul>
        <p>
          Si vous souhaitez qu&apos;un pays soit ajouté, sélectionnez-le dans
          cette liste :
        </p>
        <form action="#">
          <select name="addCountry" id="addCountry">
            <option value="">-- Choisissez un pays --</option>
            {allCountries.map((country, i) => (
              <option key={`${country}-${i}`} value={country}>
                {country}
              </option>
            ))}
          </select>
          <button type="submit">Je veux ce pays !</button>
        </form>
      </section>
    </main>
  );
}

export default Informations;

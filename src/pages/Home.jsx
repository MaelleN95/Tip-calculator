import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDatas } from '../utils/customHooks';

import Note from '../components/note/Note';

import countries from '../assets/countries.json';

/**
 * Utility function to find the currency unit from an array of currencies and a given currency.
 * @param {Array<Object>} currencyArray The list of all the currencies on the site.
 * @param {number} currency The currency for which you want the currency unit.
 * @returns {string|null} Currency unit, or null if no match found.
 */
function findCurrencyUnit(currencyArray, currency) {
  const currencyMatch = currencyArray.find(
    (curr) => parseFloat(curr.rate) === parseFloat(currency)
  );
  return currencyMatch ? currencyMatch.currencyUnit : null;
}

/**
 * Function to round a number to two decimal places.
 * @param {number|string} number The number to be rounded.
 * @returns {string} The rounded number with two decimal places.
 */
function rounded(number) {
  return parseFloat(number)
    .toFixed(2)
    .replace(/\.?0+$/, '');
}

function Home() {
  // Fetching currency data using "useDatas" custom hook
  const { currency } = useDatas();

  // States for managing various aspects of the component's data
  const [result, setResult] = useState([]);
  const [currencyUnit, setcurrencyUnit] = useState([]);
  const [NbPersons, setNbPersons] = useState(1);
  const [tipIndication, setTipIndication] = useState('');

  // Form handling using react-hook-form
  const form = useForm({ mode: 'onTouched' });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  /** Function to handle form submission */
  const onSubmit = async (data) => {
    try {
      // Calculations based on form data
      const exchangeRate = data.habitualcurrency / data.tipcurrency;
      const habCurBil = data.bill * exchangeRate;
      const tipCurTip = data.bill * (data.percent / 100);
      const habCurTip = tipCurTip * exchangeRate;

      // Updating currency units based on selected currencies
      setcurrencyUnit((prevState) => [
        findCurrencyUnit(currency, data.habitualcurrency),
        findCurrencyUnit(currency, data.tipcurrency),
        prevState[2],
      ]);

      // Setting calculation results and number of persons
      setResult([habCurBil, habCurTip, tipCurTip]);
      setNbPersons(data.divide);
    } catch (error) {
      console.log(error);
    }
  };

  /** Function to handle change in tip currency selection */
  const tipCurrencyIndicationChange = (event) => {
    setcurrencyUnit((prevState) => [
      prevState[0],
      prevState[1],
      findCurrencyUnit(currency, event.target.value),
    ]);

    // Fetching tip indication (recommendation) based on selected currency
    const selectedCurrency =
      event.target.options[event.target.selectedIndex].text;
    const selectedTipIndication = countries.find(
      (country) => country.country === selectedCurrency.split(' (')[0]
    );

    if (selectedTipIndication) {
      setTipIndication(selectedTipIndication.indication);
      form.setValue(
        'percent',
        parseFloat(selectedTipIndication.indication.match(/\d+/)[0])
      );
    } else {
      setTipIndication('');
    }
  };

  return (
    <main>
      <h1>Calculatrice de pourboire</h1>
      <Note
        direction={'vertical'}
        title="Information d'utilisation de la calcultatrice"
        openSetting={false}
      >
        Pour utiliser la calculatrice de pourboire, rien de plus simple :
        <ol>
          <li>
            Sélectionnez votre <strong>devise habituelle</strong>, celle avec
            laquelle vous avez l’habitude de payer.
          </li>
          <li>
            Choisissez la{' '}
            <strong>
              devise du pays où vous vous apprêtez à faire un pourboire
            </strong>{' '}
            :
            <Note direction="horizontal" openSetting={true}>
              Une fois choisie, une petite information, dans le même format que
              celle-ci, s’affichera en dessous pour vous conseiller sur le
              montant du pourboire.
            </Note>
          </li>
          <li>
            Indiquez le <strong>montant de l’addition</strong>.
          </li>
          <li>
            Indiquez le <strong>pourcentage</strong> de pourboire que vous
            souhaitez laisser.
          </li>
          <li>
            Indiquez le <strong>nombre de personnes</strong> si vous souhaitez
            partager le montant du pourboire.
          </li>
          <li>
            Et enfin, cliquez sur le bouton{' '}
            <strong>&quot;Calculer&quot;</strong>.
          </li>
        </ol>
      </Note>
      <section className="calculatorblock">
        <form
          className="formcalculator"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label htmlFor="habitualcurrency">
            Votre devise habituelle
            <select
              id="habitualcurrency"
              {...register('habitualcurrency', {
                required: true,
                valueAsNumber: true,
              })}
              required
            >
              <option value="">-- Choisissez une option --</option>
              {currency.map((cur, i) => (
                <option key={i} value={cur.rate}>
                  {cur.country} ({cur.code})
                </option>
              ))}
            </select>
            <p className="error">{errors.habitualcurrency?.message}</p>
          </label>
          <label htmlFor="tipcurrency">
            Devise dans laquelle vous souhaitez faire votre pourboire
            <select
              id="tipcurrency"
              {...register('tipcurrency', {
                required: {
                  value: true,
                  message:
                    'Le champ "Devise dans laquelle vous souhaitez faire votre pourboire" est obligatoire',
                },
                valueAsNumber: true,
              })}
              required
              onChange={tipCurrencyIndicationChange}
            >
              <option value="">-- Choisissez une option --</option>
              {currency.map((cur, i) => (
                <option key={i} value={cur.rate}>
                  {cur.country} ({cur.code})
                </option>
              ))}
            </select>
            <p className="error">{errors.tipcurrency?.message}</p>
          </label>

          {/* Displaying tip indication if available */}
          {tipIndication && (
            <Note
              direction={'horizontal'}
              title="Indication sur la culture du pourboire"
              openSetting={true}
            >
              {tipIndication}
            </Note>
          )}
          <div className="fd-row">
            <label htmlFor="bill">
              Montant de l&apos;addition
              <div className="input-and-unit">
                <span>{currencyUnit[2]}</span>
                <input
                  type="number"
                  id="bill"
                  {...register('bill', {
                    required: {
                      value: true,
                      message:
                        'Le champ "Montant de l\'addition" est obligatoire',
                    },
                    min: {
                      value: 1,
                      message:
                        "La valeur de l'addition doit être supérieure ou égale à 1",
                    },
                    valueAsNumber: true,
                  })}
                  required
                  defaultValue={100}
                  step={0.001}
                  min={1}
                />
              </div>
              <p className="error">{errors.bill?.message}</p>
            </label>
            <label htmlFor="percent">
              Pourcentage
              <div className="input-and-unit">
                <span>%</span>
                <input
                  type="number"
                  id="percent"
                  {...register('percent', {
                    required: {
                      value: true,
                      message: 'Le champ "pourcentage" est obligatoire',
                    },
                    min: {
                      value: 0,
                      message:
                        'La valeur du pourcentage doit être supérieure ou égale à 0',
                    },
                    max: 100,
                    valueAsNumber: true,
                  })}
                  required
                  defaultValue={15}
                  step={0.01}
                  min={0}
                  max={100}
                />
              </div>
              <p className="error">{errors.percent?.message}</p>
            </label>
            <label htmlFor="divide">
              Nombre de personnes
              <input
                type="number"
                id="divide"
                {...register('divide', {
                  required: {
                    value: true,
                    message: 'Le champ "nombre de personnes" est obligatoire',
                  },
                  min: {
                    value: 1,
                    message:
                      'Le nombre de personnes doit être supérieure ou égale à 1',
                  },
                  max: {
                    value: 100,
                    message:
                      'Le nombre de personnes doit être inférieur ou égale à 100',
                  },
                  valueAsNumber: true,
                })}
                required
                defaultValue={1}
                min={1}
                max={100}
              />
              <p className="error">{errors.divide?.message}</p>
            </label>
          </div>
          <div className="center">
            <button type="submit" disabled={!isDirty || !isValid}>
              Calculer
            </button>
          </div>
        </form>

        {/* Displaying results */}
        {result[0] != null && (
          <section className="results">
            <h2>Résultats</h2>
            {/* Displaying bill amount in habitual currency if different from tip currency */}
            {result[1] !== result[2] && (
              <Note
                direction={'horizontal'}
                title="Indication sur le montant de votre addition dans votre devise habituelle"
                openSetting={true}
              >
                Dans votre devise, le montant de l&apos;addition vaut{' '}
                <strong>
                  {rounded(result[0])}
                  {currencyUnit[0]}
                </strong>
              </Note>
            )}

            <div className="tables">
              <div className="table">
                <h3>Montant du pourboire</h3>
                <p className="result">
                  <strong>
                    {rounded(result[2])}
                    {currencyUnit[1]}
                  </strong>
                </p>
                {/* Displaying tip per person if more than one person */}
                {NbPersons !== 1 && (
                  <>
                    <p className="dividedTipTitle">Par personne</p>
                    <p className="result">
                      <strong>
                        {rounded(result[2] / NbPersons)}
                        {currencyUnit[1]}
                      </strong>
                    </p>
                  </>
                )}
              </div>
              {result[1] !== result[2] && (
                <div className="table">
                  <h3>Dans votre devise</h3>
                  <p className="result">
                    {rounded(result[1])}
                    {currencyUnit[0]}
                  </p>
                  {/* Displaying tip per person if more than one person */}
                  {NbPersons !== 1 && (
                    <>
                      <p className="dividedTipTitle">Par personne</p>
                      <p className="result">
                        {rounded(result[1] / NbPersons)}
                        {currencyUnit[0]}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </section>

      {/* Section for adding a new country */}
      <section className="countryask">
        <p>
          Il manque votre pays ? Sélectionnez-le, nous l&apos;ajouterons avec
          plaisir !
        </p>
        <div className="center">
          <button>Je veux ajouter un pays !</button>
        </div>
      </section>
    </main>
  );
}

export default Home;

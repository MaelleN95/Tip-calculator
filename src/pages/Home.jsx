import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDatas } from '../utils/customHooks';

import Note from '../components/note/Note';

import countries from '../assets/countries.json';

function findCurrencyUnit(currencyArray, currency) {
  const currencyMatch = currencyArray.find((curr) => curr.rate === currency);
  return currencyMatch ? currencyMatch.currencyUnit : null;
}

function rounded(number) {
  return parseFloat(number)
    .toFixed(2)
    .replace(/\.?0+$/, '');
}

function Home() {
  const [result, setResult] = useState([]);
  const [currencyUnit, setcurrencyUnit] = useState([]);
  const [NbPersons, setNbPersons] = useState(1);
  const [tipIndication, setTipIndication] = useState('');

  const form = useForm({ mode: 'onTouched' });
  const { register, handleSubmit, formState } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    try {
      const exchangeRate = rounded(data.habitualcurrency / data.tipcurrency);
      const habCurBil = rounded(data.bill / exchangeRate);
      const tipCurTip = rounded(data.bill * (data.percent / 100));
      const habCurTip = rounded(tipCurTip / exchangeRate);

      setcurrencyUnit([
        findCurrencyUnit(currency, data.habitualcurrency),
        findCurrencyUnit(currency, data.tipcurrency),
      ]);

      setResult([habCurBil, habCurTip, tipCurTip]);
      setNbPersons(data.divide);
    } catch (error) {
      console.log(error);
    }
  };

  const tipCurrencyIndicationChange = (event) => {
    const selectedCurrency =
      event.target.options[event.target.selectedIndex].text;
    const selectedTipIndication = countries.find(
      (country) => country.country === selectedCurrency.split(' (')[0]
    );

    selectedTipIndication
      ? setTipIndication(selectedTipIndication.indication)
      : setTipIndication('');
  };

  const { currency } = useDatas();

  return (
    <main>
      <h1>Calculatrice de pourboire</h1>
      <Note
        direction={'vertical'}
        title="Information d'utilisation de la calcultatrice"
        openSetting={false}
      >
        Informations sur l&apos;utilisation de la calculatrice à venir...
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
            >
              <option value="">-- Choisissez une option --</option>
              {currency.map((cur, i) => (
                <option key={i} value={cur.rate}>
                  {cur.country} ({cur.code})
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="tipcurrency">
            Devise dans laquelle vous souhaitez faire votre pourboire
            <select
              id="tipcurrency"
              {...register('tipcurrency', {
                required: true,
                valueAsNumber: true,
              })}
              onChange={tipCurrencyIndicationChange}
            >
              <option value="">-- Choisissez une option --</option>
              {currency.map((cur, i) => (
                <option key={i} value={cur.rate}>
                  {cur.country} ({cur.code})
                </option>
              ))}
            </select>
          </label>

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
              <input
                type="number"
                id="bill"
                {...register('bill', {
                  required: {
                    value: true,
                    message: 'Ce champ est obligatoire',
                  },
                  min: 0,
                  valueAsNumber: true,
                })}
                defaultValue={100}
                min={0}
              />
            </label>
            <label htmlFor="percent">
              Pourcentage
              <input
                type="number"
                id="percent"
                {...register('percent', {
                  required: {
                    value: true,
                    message: 'Ce champ est obligatoire',
                  },
                  min: 0,
                  max: 100,
                  valueAsNumber: true,
                })}
                defaultValue={15}
                min={0}
                max={100}
              />
            </label>
            <label htmlFor="divide">
              Nombre de personnes
              <input
                type="number"
                id="divide"
                {...register('divide', {
                  min: 1,
                  max: 100,
                  valueAsNumber: true,
                })}
                defaultValue={1}
                min={1}
                max={100}
              />
            </label>
          </div>
          <div className="center">
            <button type="submit" disabled={!isDirty || !isValid}>
              Calculer
            </button>
          </div>
        </form>

        {result[0] != null && (
          <section className="result">
            <h2>Résultats</h2>
            {result[1] !== result[2] && (
              <Note
                direction={'horizontal'}
                title="Indication sur le montant de votre addition"
                openSetting={true}
              >
                Le montant de l&apos;addition dans votre devise équivaut à{' '}
                {result[0]}
                {currencyUnit[0]}
              </Note>
            )}

            <table>
              <caption>Pourboire</caption>
              <tbody>
                <tr>
                  <td>
                    {result[2]}
                    {currencyUnit[1]}
                  </td>
                </tr>
                <tr>
                  <th>Par personne</th>
                  <td>
                    {rounded(result[2] / NbPersons)}
                    {currencyUnit[1]}
                  </td>
                </tr>
              </tbody>
            </table>

            {result[1] !== result[2] && (
              <table>
                <caption>Equivalent dans votre devise</caption>
                <tbody>
                  <tr>
                    <td>
                      {result[1]}
                      {currencyUnit[0]}
                    </td>
                  </tr>
                  <tr>
                    <th>Par personne</th>
                    <td>
                      {rounded(result[1] / NbPersons)}
                      {currencyUnit[0]}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </section>
        )}
      </section>

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

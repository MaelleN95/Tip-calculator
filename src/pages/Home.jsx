import { useForm } from 'react-hook-form';
import { useDatas } from '../utils/customHooks';

import Note from '../components/note/Note';

function Home() {
  const form = useForm({ mode: 'onTouched' });
  const { register, handleSubmit, formState } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { currency } = useDatas();

  return (
    <main>
      <h1>Calculatrice de pourboire</h1>
      <section>
        <Note />
        <form
          className="calculator"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label htmlFor="habitual-currency">
            Votre devise habituelle
            <select id="habitual-currency" {...register('habitual-currency')}>
              {currency.map((cur, i) => (
                <option key={i} value={cur.rate}>
                  {cur.country} ({cur.code})
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="tip-currency">
            Devise dans laquelle vous souhaitez faire votre pourboire
            <select id="tip-currency" {...register('tip-currency')}>
              {currency.map((cur, i) => (
                <option key={i} value={cur.rate}>
                  {cur.country} ({cur.code})
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="bil">
            Montant total
            <input
              type="number"
              id="bil"
              {...register('bil', {
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
                min: 0,
                max: 100,
                valueAsNumber: true,
              })}
              defaultValue={1}
              min={0}
              max={100}
            />
          </label>
          <button type="submit" disabled={!isDirty || !isValid}>
            Calculer
          </button>
        </form>
        <section className="result">
          <h2>Résultats</h2>
          <table>
            <caption>Pourboire</caption>
            <tbody>
              <tr>
                <th>Total</th>
                <td>0</td>
              </tr>
              <tr>
                <th>Par personne</th>
                <td>0</td>
              </tr>
            </tbody>
          </table>

          <table>
            <caption>Equivalent dans votre devise</caption>
            <tbody>
              <tr>
                <th>Total</th>
                <td>0</td>
              </tr>
              <tr>
                <th>Par personne</th>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      <p>
        Il manque votre pays ? Sélectionnez-le, nous l&apos;ajouterons avec
        plaisir !
      </p>
      <button>Je veux ajouter un pays !</button>
    </main>
  );
}

export default Home;

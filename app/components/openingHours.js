import getData from '../lib/fetchAPI';
import { getFirmData } from '../lib/queries';
import { daysOfWeekPl } from '../lib/variables';
import { v4 as uuidv4 } from 'uuid';

export default async function OpeningHours({ style }) {
  const data = await getData(getFirmData);
  const firmData = await data.firmsData[0];

  console.log(firmData.workingHours);

  const daysOfWeekToShortPl = day => {
    if (day) {
      const pl = daysOfWeekPl.find(
        item => item.en.toLowerCase() === day.toLowerCase()
      );
      return pl.shortPl;
    }
  };

  const workingHours =
    firmData &&
    firmData.workingHours.length &&
    firmData.workingHours.map(item => {
      const day = item.day && {
        id: item.id || uuidv4(),
        day: item.day && daysOfWeekToShortPl(item.day),
        hours: `${item.openingHour} - ${item.closingHour}`,
        closed: item.closed,
      };
      if (day) {
        return day;
      }
    });

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h2 className={style.title}>Godziny otwarcia</h2>
      </div>
      <div className={style.hoursListContainer}>
        {workingHours.length &&
          workingHours.map(item => {
            return (
              item && (
                <p className={style.row} key={item.id}>
                  {item?.day}:{' '}
                  <span className={style.rowBold}>
                    {item.closed ? 'Zamknięte' : item?.hours}
                  </span>
                </p>
              )
            );
          })}
      </div>
    </div>
  );
}

import { Time } from "@utils/time";
import styles from '@styles/schedule.module.css'

export default function Schedule({ scheduleData }) {
  const headers = <tr>
    <th>Section</th>
    <th>Class</th>
    <th>Enrolled</th>
    <th>Time</th>
    <th>Days</th>
    <th>Location</th>
    <th>Instructor</th>
  </tr>
  const rows = scheduleData.map((row: any) => {
    let prof = ['',''];
    if (row.instructor){
      prof = row.instructor.split(',');
    }
    const profName = `${prof[1]} ${prof[0]}`;
    let timeString;
    let dayString;
    if (row.time) {
      timeString = `${new Time(row.time.startTime).toString()} - ${new Time(row.time.endTime).toString()} `;
      dayString = row.time.days.join(',')
    } else {
      timeString = '';
      dayString = '';
    }
    return (<tr key={row.classNumber}>
      <td className={styles.section}>{row.section.type} {row.section.num}</td>
      <td className={styles.classNumber}>{row.classNumber}</td>
      <td className={styles.enrolled}>{row.enrolTotal} / {row.enrolCap}</td>
      <td className={styles.time}>{timeString}</td>
      <td className={styles.day}>{dayString}</td>
      <td className={styles.room}>{row.buildingCode} {row.roomNumber}</td>
      <td className={styles.prof}>{profName}</td>
    </tr>)
  })
  return (
    <div className={styles.container}>
      <table>
        <thead>
          {headers}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}
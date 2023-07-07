import { Time } from "@utils/time";
import styles from '@styles/schedule.module.css'
import Class from "@models/Class";

export default function Schedule({ scheduleData }: {scheduleData: Class[]}) {
  const headers = <tr>
    <th>Section</th>
    <th>Class</th>
    <th>Enrolled</th>
    <th>Time</th>
    <th>Days</th>
    <th>Location</th>
    <th>Instructor</th>
  </tr>
  const rows = scheduleData.map((row) => {
    try {
      let prof = ['',''];
      if (row.instructor){
        prof = row.instructor.split(',');
      }
      const profName = `${prof[1]} ${prof[0]}`;
      let timeString = ''
      let dayString = ''
      if (row.time) {
        timeString = `${new Time(row.time.startTime).toString()} - ${new Time(row.time.endTime).toString()} `;
        dayString = row.time.days.join(',')
      }
      let sectionString = ''
      if (row.section) {
        sectionString = `${row.section.type} ${row.section.num}`
      }
      return (<tr key={row.classNumber}>
        <td className={styles.section}>{sectionString}</td>
        <td className={styles.classNumber}>{row.classNumber}</td>
        <td className={styles.enrolled}>{row.enrolTotal} / {row.enrolCap}</td>
        <td className={styles.time}>{timeString}</td>
        <td className={styles.day}>{dayString}</td>
        <td className={styles.room}>{row.buildingCode} {row.roomNumber}</td>
        <td className={styles.prof}>{profName}</td>
      </tr>)
    } catch (e) {
      console.log(e);
      return <tr></tr>
    }
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

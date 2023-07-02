import Head from "next/head";
import { useSearchParams } from "next/navigation";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import getCourseDetails from "@controllers/getCourseDetails";
import getSchedule from "@controllers/getSchedule";
import { Time } from "@utils/time";

export default function Course({courseName, courseDetails, schedule}): InferGetServerSidePropsType<typeof getServerSideProps> {
  courseDetails = JSON.parse(courseDetails);
  schedule = JSON.parse(schedule);
  console.log(schedule['1219']);
  return (
    <div className="container">
      <Head>
        <title>{courseName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="course-title">{courseName} - {courseDetails.title}</h1>
        <p>{courseDetails.description}</p>

        <h2>Exam Schedule</h2>
        <h2>Offerings</h2>
        <h3>Fall 2022</h3>
        {createScheduleTable(schedule['1219'])}
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx: { query: any; }) {
  const { query } = ctx;
  const subjectCode = query['subjectCode'];
  const catalogNumber = query['catalogNumber'];
  if (!subjectCode || !catalogNumber) {
    return {
      notFound: true,
    };
  }
  const courseDetails = await getCourseDetails(subjectCode, catalogNumber);
  const schedule = await getSchedule(subjectCode, catalogNumber, undefined) // get for all terms

  return {
    props: {
      courseName: `${subjectCode} ${catalogNumber}`,
      courseDetails: JSON.stringify(courseDetails[0]),
      schedule: JSON.stringify(schedule),
    },
  };
};

function createScheduleTable(termScheduleData: any) {
  const headers = <tr>
    <th>Section</th>
    <th>Class</th>
    <th>Enrolled</th>
    <th>Time</th>
    <th>Days</th>
    <th>Location</th>
    <th>Instructor</th>
  </tr>
  const rows = termScheduleData.map((row: any) => {
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
    return (<tr>
      <td>{row.section.type} {row.section.num}</td>
      <td>{row.classNumber}</td>
      <td>{row.enrolTotal}/{row.enrolCap}</td>
      <td>{timeString}</td>
      <td>{dayString}</td>
      <td>{row.buildingCode} {row.roomNumber}</td>
      <td>{profName}</td>
    </tr>)
  })
  return (
    <table>
      <thead>
        {headers}
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

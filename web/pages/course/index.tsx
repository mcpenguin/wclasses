import Head from "next/head";

import getCourseDetails from "@controllers/getCourseDetails";
import getSchedule from "@controllers/getSchedule";
import { TermCode } from "@utils/termCode";

import Schedule from "@components/schedule";
import styles from "@styles/course.module.css"
import Course from "@models/Course";
import Class from "@models/Class";

export default function CoursePage(props: any) {
  const courseDetails: Course = JSON.parse(props.courseDetails);
  const schedule: { [key: string]: Class[] } = JSON.parse(props.schedule);
  const courseName = props.courseName;
  return (
    <>
      <Head>
        <title>{courseName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="course-title">{courseName} - {courseDetails.title}</h1>
        <p className={styles.description}>{courseDetails.description}</p>
        <h2>Offerings</h2>
        {
          Object.entries(schedule)
            .sort((a,b) => parseInt(b[0]) - parseInt(a[0]))
            .map(([termcode, data]) => <>
              <h3>{new TermCode(termcode).getName()} [{termcode}]</h3>
              <Schedule scheduleData={data} />
          </>)
        }
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: { query: {subjectCode: string, catalogNumber: string} }) {
  const { query } = ctx;
  const subjectCode = query['subjectCode'];
  const catalogNumber = query['catalogNumber'];
  if (!subjectCode || !catalogNumber) {
    return {
      notFound: true,
    };
  }
  const courseDetails = await getCourseDetails(subjectCode, catalogNumber);
  if (!courseDetails || courseDetails.length === 0) {
    return {
      notFound: true,
    };
  }
  const schedule = await getSchedule(subjectCode, catalogNumber, undefined) // get for all terms

  return {
    props: {
      courseName: `${subjectCode} ${catalogNumber}`,
      courseDetails: JSON.stringify(courseDetails[0]),
      schedule: JSON.stringify(schedule),
    },
  };
}

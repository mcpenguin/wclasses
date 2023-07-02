import Head from "next/head";
import { useSearchParams } from "next/navigation";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import getCourseDetails from "@controllers/getCourseDetails";
import getSchedule from "@controllers/getSchedule";
import { Time } from "@utils/time";
import { TermCode } from "@utils/termCode";

import Schedule from "../../components/schedule";

import styles from "@styles/course.module.css"

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

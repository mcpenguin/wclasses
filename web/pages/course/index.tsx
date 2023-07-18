import Head from "next/head";

import getCourseDetails from "@controllers/getCourseDetails";
import getSchedule from "@controllers/getSchedule";
import { TermCode } from "@utils/termCode";

import Schedule from "@components/schedule";
import styles from "@styles/course.module.css";
import Course from "@models/Course";
import Class from "@models/Class";
import getCourseUWFlowDetails from "@controllers/getCourseUWFlowDetails";
import CourseUWFlowData from "@models/CourseUWFlowData";
import MyProgressBar from "@components/myProgressBar";
import { UW_FLOW_LINK } from "@constants";
import toTitleCase from "@utils/toTitleCase";

type Props = {
  courseName: string;
  courseDetails: string;
  courseUWFlowDetails: string;
  schedule: string;
};

export default function CoursePage(props: Props) {
  const courseDetails: Course = JSON.parse(props.courseDetails);
  const courseUWFlowDetails: CourseUWFlowData = JSON.parse(
    props.courseUWFlowDetails
  );
  const schedule: { [key: string]: Class[] } = JSON.parse(props.schedule);
  const courseName = props.courseName;
  const uwFlowLink = `${UW_FLOW_LINK}/course/${courseDetails.subjectCode.toLowerCase()}${courseDetails.catalogNumber.toLowerCase()}`;
  return (
    <>
      <Head>
        <title>{courseName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="course-title">
          {courseName} - {courseDetails.title}
        </h1>
        <p className={styles.description}>{courseDetails.description}</p>
        <div className={styles.parent}>
          <div className={styles.requisites}>
            <div>
              <h3>Prerequisites</h3>
              <p>{courseUWFlowDetails.prereqs}</p>
            </div>
            <div>
              <h3>Corequisites</h3>
              <p>{courseUWFlowDetails.coreqs || "None"}</p>
            </div>
            <div>
              <h3>Antirequisites</h3>
              <p>{courseUWFlowDetails.antireqs || "None"}</p>
            </div>
          </div>
          <div className={styles.offerings}>
            <h2>Offerings</h2>
            {Object.entries(schedule)
              .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
              .map(([termcode, data]) => (
                <>
                  <h3>
                    {new TermCode(termcode).getName()} [{termcode}]
                  </h3>
                  <Schedule scheduleData={data} />
                </>
              ))}
          </div>
          <div className={styles.uwflow}>
            <h2>UW Flow Ratings</h2>
            <h3>
              Liked: {(courseUWFlowDetails.rating.liked * 100).toFixed(2)}%
            </h3>
            <MyProgressBar
              value={courseUWFlowDetails.rating.liked}
              color="#114873"
            />
            <h3>Easy: {(courseUWFlowDetails.rating.easy * 100).toFixed(2)}%</h3>
            <MyProgressBar
              value={courseUWFlowDetails.rating.easy}
              color="#111c73"
            />
            <h3>
              Useful: {(courseUWFlowDetails.rating.useful * 100).toFixed(2)} %
            </h3>
            <MyProgressBar
              value={courseUWFlowDetails.rating.useful}
              color="#3b1173"
            />
            <h2>{courseName} leads to</h2>
            {courseUWFlowDetails.postrequisites.map((pr) => (
              // eslint-disable-next-line react/jsx-key
              <p>
                <a
                  href={`/course?subjectCode=${pr.courseCode.subjectCode}&catalogNumber=${pr.courseCode.catalogNumber}`}
                >
                  {pr.courseCode.subjectCode} {pr.courseCode.catalogNumber} -{" "}
                  {pr.name}
                </a>
                <br />
              </p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: {
  query: { subjectCode: string; catalogNumber: string };
}) {
  const { query } = ctx;
  const subjectCode = query["subjectCode"].toUpperCase();
  const catalogNumber = query["catalogNumber"].toUpperCase();
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
  const schedule = await getSchedule(subjectCode, catalogNumber, undefined); // get for all terms

  const courseUWFlowDetails = await getCourseUWFlowDetails(
    subjectCode,
    catalogNumber
  );

  return {
    props: {
      courseName: `${subjectCode} ${catalogNumber}`,
      courseDetails: JSON.stringify(courseDetails[0]),
      courseUWFlowDetails: JSON.stringify(courseUWFlowDetails),
      schedule: JSON.stringify(schedule),
    },
  };
}

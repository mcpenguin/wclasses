import Head from "next/head";

import { TermCode } from "@utils/termCode";

import Schedule from "@components/schedule";

import getCourseDetailsAsync from "@controllers/getCourseDetails";
import getProfClassesAsync from "@controllers/getProfClasses";
import Course from "@models/Course";
import Class from "@models/Class";
import getProfUWFlowDetailsAsync from "@controllers/getProfUWFlowDetails";
import ProfUWFlowData from "@models/ProfUWFlowData";

import styles from "@styles/prof.module.css"
import MyProgressBar from "@components/myProgressBar";
import toTitleCase from "@utils/toTitleCase";

type Props = {
  profName: string;
  profClassDetails: string;
  profUWFlowDetails: string;
  courseDetails: string;
};

export default function ProfPage(props: Props) {
  const courseDetails: { [key: string]: Course } = JSON.parse(props.courseDetails);
  const profClassDetails: { [key: string]: Class[] } = JSON.parse(props.profClassDetails);
  const profUWFlowDetails: ProfUWFlowData = JSON.parse(props.profUWFlowDetails);
  const profName = props.profName;
  return (
    <>
      <Head>
        <title>{profName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{profName}</h1>
        <div className={styles.parent}>
          <div>
            <h2>Courses Taught</h2>
            {Object.entries(profClassDetails)
              .sort((a, b) => {
                  const [aterm, asubj, acatalog] = a[0].split(" ");
                  const [bterm, bsubj, bcatalog] = b[0].split(" ");
                  return bterm.localeCompare(aterm) ||
                    asubj.localeCompare(bsubj) ||
                    acatalog.localeCompare(bcatalog);
                }
              )
              .map(([k, data]) => {
                const [term, subjectCode, catalogNumber] = k.split(" "); 
                const courseDetail = courseDetails[`${subjectCode}${catalogNumber}`];
                const courseName = courseDetail ? courseDetail.title : "Unknown"
                return (<>
                  <h3>
                    {subjectCode} {catalogNumber} - {courseName} [{new TermCode(term).getName()}]
                  </h3>
                  <Schedule scheduleData={data} />
                </>);
              })}
          </div>
          <div>
              <h2>UW Flow Ratings</h2>
              <h3>Liked: {(profUWFlowDetails.rating.liked * 100).toFixed(2)}%</h3>
              <MyProgressBar
                value={profUWFlowDetails.rating.liked}
                color="#114873"
              />
              <h3>Clear: {(profUWFlowDetails.rating.clear * 100).toFixed(2)}%</h3>
              <MyProgressBar
                value={profUWFlowDetails.rating.clear}
                color="#111c73"
              />
              <h3>
                Engaging: {(profUWFlowDetails.rating.engaging * 100).toFixed(2)} %
              </h3>
              <MyProgressBar
                value={profUWFlowDetails.rating.engaging}
                color="#3b1173"
              />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: {
  query: { firstName: string; lastName: string };
}) {
  const { query } = ctx;
  // const firstName = toTitleCase(query.firstName);
  // const lastName = toTitleCase(query.lastName);
  const firstName = query.firstName;
  const lastName = query.lastName;
  if (!firstName || !lastName) {
    return {
      notFound: true,
    };
  }
  const profClassDetails = await getProfClassesAsync(firstName, lastName);
  if (!profClassDetails) {
    return {
      notFound: true,
    };
  }

  // Get course details of all the courses that the professor has taught
  // {courseCode: courseInformation}
  const courseDetails: { [key: string]: Course } = {};
  const coursesProfTaught = [
    ...new Set(Object.keys(profClassDetails).map((k) => {
      const [ _term, subjectCode, catalogNumber ] = k.split(" ");
      return [subjectCode, catalogNumber];
    })),
  ];
  for (const [subjectCode, catalogNumber] of coursesProfTaught) {
    const courseInfo = await getCourseDetailsAsync(subjectCode, catalogNumber);
    if (courseInfo) {
      courseDetails[`${subjectCode}${catalogNumber}`] = courseInfo[0];
    }
  }

  const profUWFlowDetails = await getProfUWFlowDetailsAsync(firstName, lastName);

  return {
    props: {
      profName: `${firstName} ${lastName}`,
      profClassDetails: JSON.stringify(profClassDetails),
      profUWFlowDetails: JSON.stringify(profUWFlowDetails),
      courseDetails: JSON.stringify(courseDetails),
    },
  };
}

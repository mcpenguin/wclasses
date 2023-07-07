import Head from "next/head";

import { TermCode } from "@utils/termCode";

import Schedule from "@components/schedule";

import getCourseDetailsAsync from "@controllers/getCourseDetails";
import getProfClassesAsync from "@controllers/getProfClasses";
import Course from "@models/Course";
import Class from "@models/Class";

type Props = {
  profName: string;
  profClassDetails: string;
  courseDetails: string;
};

export default function ProfPage(props: Props) {
  const courseDetails: { [key: string]: Course } = JSON.parse(props.courseDetails);
  const profClassDetails: { [key: string]: Class[] } = JSON.parse(props.profClassDetails);
  const profName = props.profName;
  return (
    <>
      <Head>
        <title>{profName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="course-title">{profName}</h1>
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
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: {
  query: { firstName: string; lastName: string };
}) {
  const { query } = ctx;
  const { firstName, lastName } = query;
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

  return {
    props: {
      profName: `${firstName} ${lastName}`,
      profClassDetails: JSON.stringify(profClassDetails),
      courseDetails: JSON.stringify(courseDetails),
    },
  };
}

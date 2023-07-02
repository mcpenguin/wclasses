import Head from "next/head";
import { useSearchParams } from "next/navigation";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import getCourseDetails from "@controllers/getCourseDetails";

export default function Course({courseName, courseDetails}): InferGetServerSidePropsType<typeof getServerSideProps> {
  courseDetails = JSON.parse(courseDetails);
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
  return {
    props: {
      courseName: `${subjectCode} ${catalogNumber}`,
      courseDetails: JSON.stringify(courseDetails[0]),
    },
  };
};


// export default function About({ message }) {
//   return (
//       <div>
//           <h1>{message}</h1>
//       </div>
//   );
// }
  
// export function getServerSideProps() {
//   return {
//       props: { message: "Welcome to the About Page" },
//   };
// }

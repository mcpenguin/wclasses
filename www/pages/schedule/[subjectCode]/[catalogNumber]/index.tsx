import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from './Schedule.module.scss'

import ICourseWithUWFlowData from '@server/types/ICourseWithUWFlowData'
import ICourseCode from '@server/types/ICourseCode'

// This function gets called at build time on server-side
export async function getServerSideProps(context: any) {
  const {subjectCode, catalogNumber} = context.params;

  const response = await fetch(`http://localhost:8000/courses/details/${subjectCode}/${catalogNumber}/`);
  const courseDetails: ICourseCode[] = await response.json();

  return {
    props: {
      courseDetails
    },
  }
}

const Schedule: NextPage = (props: any) => {

  let courseDetails: ICourseWithUWFlowData = props.courseDetails;
  let courseName: string = `${courseDetails.subjectCode} ${courseDetails.catalogNumber}`

  let corequisitesAsLinks = courseDetails.corequisites
    ?.map(c => <p>
      <Link href={`/schedule/${c.subjectCode}/${c.catalogNumber}`}>
        <a>{c.subjectCode} {c.catalogNumber} - {courseDetails.title}</a>
      </Link>
    </p>)

  let antirequisitesAsLinks = courseDetails.antirequisites
  ?.map(c => <p>
    <Link href={`/schedule/${c.subjectCode}/${c.catalogNumber}`}>
      <a>{c.subjectCode} {c.catalogNumber} - {courseDetails.title}</a>
    </Link>
  </p>)

  return (
    <div className={styles.container}>
      <Head>
        <title>{courseName}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{courseName}</h1>

        <p className={styles.description}>
          {courseDetails.description}
        </p>

        <h3>Prerequisites</h3>
        <p>{courseDetails.prerequisitesAsString}</p>
        
        <h3>Corequisites</h3>
        {corequisitesAsLinks}

        <h3>Antirequisites</h3>
        {antirequisitesAsLinks}

      </main>
    </div>
  )
}

export default Schedule;

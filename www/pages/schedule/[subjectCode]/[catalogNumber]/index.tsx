import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from './Schedule.module.scss'

import ICourseWithUWFlowData from '@server/types/ICourseWithUWFlowData'
import ICourseCode from '@server/types/ICourseCode'

import { parseTermCode } from '../../../../helpers/termcode'

// This function gets called at build time on server-side
export async function getServerSideProps(context: any) {
  const {subjectCode, catalogNumber} = context.params;
  let response = null;

  response = await fetch(`http://localhost:8000/courses/details/${subjectCode}/${catalogNumber}/`);
  const courseDetails: ICourseCode[] = await response.json();

  response = await fetch(`http://localhost:8000/courses/termOfferings/${subjectCode}/${catalogNumber}/`);
  const termOfferingsDetails: ICourseCode[] = await response.json();

  return {
    props: {
      courseDetails,
      termOfferingsDetails,
    },
  }
}

const Schedule: NextPage = (props: any) => {

  let courseDetails: ICourseWithUWFlowData = props.courseDetails;
  let courseName: string = `${courseDetails.subjectCode} ${courseDetails.catalogNumber} - ${courseDetails.title}`

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

  let termOfferingsDetails: string[] = props.termOfferingsDetails;

  let termCodesAsElements = termOfferingsDetails
    .map(t => <li>{parseTermCode(t)}</li>);

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

        <h3>Terms Offered in the Past</h3>
        <ul>
          {termCodesAsElements}
        </ul>

      </main>
    </div>
  )
}

export default Schedule;

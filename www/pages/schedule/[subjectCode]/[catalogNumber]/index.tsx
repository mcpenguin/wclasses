import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from './Schedule.module.scss'

import ICourseWithUWFlowData from '@server/types/ICourseWithUWFlowData'
import ICourse from '@server/types/ICourse'
import ICourseCode from '@server/types/ICourseCode'

import { parseTermCode } from '../../../../helpers/termcode'

const GetCourse = async (course: ICourseCode): Promise<ICourse> => {
  const { subjectCode, catalogNumber } = course;
  let response = await fetch(`http://localhost:8000/courses/details/${subjectCode}/${catalogNumber}`)
  let c: Promise<ICourse> = response.json();
  return c;
}

const TurnICourseIntoLink = (c: ICourse): any => {
  return <p>
    <Link href={`/schedule/${c.subjectCode}/${c.catalogNumber}`}>
      <a>
        {c.subjectCode} {c.catalogNumber} - {c.title}
      </a>
    </Link>
  </p>
}

// This function gets called at build time on server-side
export async function getServerSideProps(context: any) {
  const subjectCode: string = context.params.subjectCode;
  const catalogNumber: string = context.params.catalogNumber;
  let response = null;

  response = await fetch(`http://localhost:8000/courses/details/${subjectCode.toUpperCase()}/${catalogNumber.toUpperCase()}/`);
  const courseDetails = await response.json();

  response = await fetch(`http://localhost:8000/courses/termOfferings/${subjectCode.toUpperCase()}/${catalogNumber.toUpperCase()}/`);
  const termOfferingsDetails: string[] = await response.json();

  let corequisitesAsCodes: ICourseCode[] = courseDetails.corequisites;
  let corequisites = corequisitesAsCodes
    ?.map(async c => await GetCourse(c))

  let antirequisitesAsCodes: ICourseCode[] = courseDetails.antirequisites;
  console.log(antirequisitesAsCodes);
  let antirequisites = antirequisitesAsCodes
    ?.map(async c => await GetCourse(c))
  console.log(antirequisites);

  let postrequisitesAsCodes: ICourseCode[] = courseDetails.postrequisites;
  let postrequisites = postrequisitesAsCodes
    ?.map(async c => await GetCourse(c))

  return {
    props: {
      courseDetails,
      termOfferingsDetails,
      corequisites: [corequisites ?? [null]][0],
      antirequisites: [antirequisites ?? [null]][0],
      postrequisites: [postrequisites ?? [null]]
    },
  }
}

const Schedule: NextPage = (props: any) => {

  let courseDetails: ICourseWithUWFlowData = props.courseDetails;
  let courseCode: string = `${courseDetails.subjectCode} ${courseDetails.catalogNumber}`;
  let courseName: string = `${courseCode} - ${courseDetails.title}`

  let termOfferingsDetails: string[] = props.termOfferingsDetails;

  let termCodesAsElements = termOfferingsDetails
    .map(t => <li>{parseTermCode(t)}</li>);

  let corequisites = props.corequisites;
  let corequisitesAsLinks = corequisites.map(TurnICourseIntoLink)

  let antirequisites = props.antirequisites;
  let antirequisitesAsLinks = antirequisites.map(TurnICourseIntoLink)

  let postrequisites = props.postrequisites;
  let postrequisitesAsLinks = postrequisites.map(TurnICourseIntoLink)

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

        <h3>Courses {courseCode} leads to</h3>
        {postrequisitesAsLinks}

        <h3>Terms Offered in the Past</h3>
        <ul>
          {termCodesAsElements}
        </ul>

      </main>
    </div>
  )
}

export default Schedule;


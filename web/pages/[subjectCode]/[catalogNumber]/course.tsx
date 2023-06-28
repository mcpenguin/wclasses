import Head from 'next/head'
import { getServerSideProps } from '@helpers/index'
import type { InferGetServerSidePropsType } from 'next'

import getCourseDetails from '@controllers/getCourseDetails';

export default function Course(
  { params }: { params: {subjectCode: string, catalogNumber: string}},
): InferGetServerSidePropsType<typeof getServerSideProps> {
  console.log(params);
  const courseName = `${params.subjectCode} ${params.catalogNumber}`;
  return (
    <div className="container">
      <Head>
        <title>{courseName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          WClasses HomePage
        </h1>
      </main>
    </div>
  )
}

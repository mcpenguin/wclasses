import Head from 'next/head'
import CourseForm from '../components/courseForm'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>WClasses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          WClasses HomePage
        </h1>
        <p>
          Welcome to WClasses!
        </p>
        <p>
          This is a very pre-alpha build of a project that I have been thinking of
          working on for a while.
        </p>
        <p>
          Essentially, the problem that this website aims to solve is to provide
          a simple UI to two functionalities that UW Flow does not currently
          provide:
        </p>
        <ul>
          <li>view past offerings of courses;</li>
          <li>view what courses professors have taught in the past;</li>
          <li>view what faculty professors are from, as well as their contact details;</li>
          <li>view examination schedules for a course.</li>
        </ul>
        <p>
          The first bullet point has been implemented; you can simply navigate to <code>/course?subjectCode=XXX&catalogNumber=XXX</code>.
          <br></br>
          The rest of the bullet points is in the works and will be released in a future update.
        </p>
        <p>
          Note: since this is just a POC, the website has not been optimized for mobile
          performance.
        </p>
        <p>
          Find my contact details and other projects here on my <a href="https://marcus-chan.me">personal website</a>
        </p>
        <CourseForm />
      </main>
    </div>
  )
}

import Head from 'next/head'
import CourseForm from '../components/courseForm'
import ProfForm from '@components/profForm'

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
          This is an alpha build of a project that I have been thinking of
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
        </ul>
        <p>
          Note: since much of the data is in a table format, it might not be ideal to view
          this website on a mobile device. I apologize for the inconvenience.
        </p>
        <p>
          Find my contact details and other projects here on my <a href="https://marcus-chan.me">personal website</a>
        </p>
        <p>
          Check out the code and suggest changes/improvements on the <a href="https://github.com/mcpenguin/wclasses">GitHub</a> for
          this website.
        </p>
        <CourseForm />
        <ProfForm />
      </main>
    </div>
  )
}

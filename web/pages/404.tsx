import Head from "next/head";

export default function NotFound() {
  return(<div>
    <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <h1>Sorry, the page you requested could not be found.</h1>
      <p>
        If you're searching for a course, please make sure the course actually exists.
      </p>
    </main>
  </div>
  )
}

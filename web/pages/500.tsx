import Head from "next/head";

export default function InternalError() {
  return(<div>
    <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <h1>Sorry, there was an internal error.</h1>
      <p>
        If you believe this was a mistake, please contact the developer of this website 
        <a href="https://marcus-chan.me">here</a>
      </p>
    </main>
  </div>
  )
}

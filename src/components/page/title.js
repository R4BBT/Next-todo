import Head from 'next/head'

export const Title = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/images/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}

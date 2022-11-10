import Head from 'next/head'

export const Title = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

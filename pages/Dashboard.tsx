import {useState, useEffect, VFC} from 'react'

export const Dashboard: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState(null) //TODO dodac jaki array

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch('http://localhost:3005')
      const data = await response.json()
      setDashboardData(data)
      setIsLoading(false)
    }
    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      {/*
      TODO zamiast <a>, uzywa sie <Link> w Next.js
        A jak przejdzie na inna strone w Reacie, to powinno uzywac Router.push(blabla)
        https://nextjs.org/docs/api-reference/next/link
        https://nextjs.org/docs/api-reference/next/router#userouter
        (unchanekku nie mozna patrzyc tu, wiec nie moge zmieniac desu nya)
      */}
      <a
        href={
          dashboardData && dashboardData[0]
            ? dashboardData[0]['url']
            : undefined
        }
      >
        {dashboardData && dashboardData[0] ? dashboardData[0]['height'] : null}
      </a>
    </>
  )
}

export default Dashboard

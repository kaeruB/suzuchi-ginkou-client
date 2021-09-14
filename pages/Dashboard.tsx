import { useState, useEffect, VFC } from 'react'
import Link from 'next/link'

export const Dashboard: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState(null) //TODO add types when format is decided

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

  return dashboardData && dashboardData[0] ? (
    <Link href={dashboardData[0]['url']}>
      <a
        href={
          dashboardData && dashboardData[0]
            ? dashboardData[0]['url']
            : undefined
        }
      >
        {dashboardData[0]['height']}
      </a>
    </Link>
  ) : null
}

export default Dashboard

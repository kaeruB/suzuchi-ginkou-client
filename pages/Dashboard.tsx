import { useState, useEffect } from 'react'

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)

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
    <div>
      <a
        href={
          dashboardData && dashboardData[0]
            ? dashboardData[0]['url']
            : undefined
        }
      >
        {dashboardData && dashboardData[0] ? dashboardData[0]['height'] : null}
      </a>
    </div>
  )
}

export default Dashboard

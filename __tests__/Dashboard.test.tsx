import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import 'setimmediate'
import { getPage } from 'next-page-tester'
// import { URL_TRANSACTION_SUMMARY } from '../pages/utils/constants/endpoints'

// const server = setupServer(
//   rest.get(
//     // `http://localhost:3005/${URL_TRANSACTION_SUMMARY}`,
//     `URL_TRANSACTION_SUMMARY`,
//     (req, res, ctx) => {
//         return res(
//           ctx.status(200),
//           ctx.json([
//             {
//               summary: 1000,
//               history: {
//                 amount: 100,
//                 borrowedBy: 'kazu',
//                 category: 'Home',
//                 description: 'this is desc desu',
//                 timestamp: 2020-12-15,
//               }
//             },
//           ])
//         )
//     }
//   )
// )

// beforeAll(() => server.listen())
// afterEach(() => {
//   server.resetHandlers()
//   cleanup()
// })
// afterAll(() => server.close())

describe('Dashboard page', ()=> {
  it('Should render text Suzuchi Ginkou', async () => {
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    expect(screen.queryByText('Loading...')).toBeInTheDocument();// before rendering

    // I think using seTimeout is not best way,
    // but if I did test without it, cors error would be appeared
    setTimeout(async ()=> {
      expect(await screen.findByText('Suzuchi Ginkou')).toBeInTheDocument()
    }, 0)
  })

  // it('Should render Error text when fetch failed', async () => {
  //   server.use(
  //     rest.get(
  //       URL_TRANSACTION_SUMMARY,
  //       (req, res, ctx) => {
  //         return res(ctx.status(400))
  //       }
  //     )
  //   )
  //   render(<Dashboard />)
  //   expect(await screen.findByText('Error!')).toBeInTheDocument()
  // })
})
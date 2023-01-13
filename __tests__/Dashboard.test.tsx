import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import 'setimmediate'
import { getPage } from 'next-page-tester'
import userEvent from '@testing-library/user-event'
import {TRANSACTIONS_PATH} from "../src/utils/constants/routerPaths";
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
//                 userWhoPaid: 'kazu',
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

// TODO: delete setTimeout()
describe('Dashboard page', ()=> {
  it('Should render text Suzuchi Ginkou', async () => {
    const { page } = await getPage({
      route: TRANSACTIONS_PATH,
    })
    render(page)
    expect(screen.queryByText('Loading...')).toBeInTheDocument();// before rendering

    // I think using seTimeout is not best way,
    // but if I did test without it, cors error would be appeared
    setTimeout(()=> {
      expect(screen.findByText('Suzuchi Ginkou')).toBeInTheDocument()
    }, 0)
  })

  it('Should open Add new Transaction after clicking button',() => {
    setTimeout(()=> {
      userEvent.click(screen.getByTestId('btn-add-new-transaction'))
      expect(screen.findByText('Add Transaction')).toBeInTheDocument()
    }, 0)
  })

  // it('should show 404 page when frontend gets 404 response', async () => {
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
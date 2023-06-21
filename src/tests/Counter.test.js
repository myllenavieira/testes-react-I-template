import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../components/Counter'

describe("Counter", ()=>{
    test("aumentar o contador em 3 quando clicado 3 vezes", async()=>{

        const user = userEvent.setup() 

        render(<Counter />)

        //screen.debug()

        const plusBtn = screen.getByRole('button', {name: /\+/i} )

        const item = screen.getByText(/0/i)

        await user.click(plusBtn)
        await user.click(plusBtn)
        await user.click(plusBtn)

        expect(item).toBeInTheDocument("3")


    })
})
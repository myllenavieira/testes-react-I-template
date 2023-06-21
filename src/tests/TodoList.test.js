import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../components/TodoList'

describe("TodoList", () => {
    test("deve renderizar com título", () => {
        render(<TodoList />)

        //screen.debug() - ver console.log pra ver o que estamos trabalhando
        //const title = screen.getByText("Todo List") ou 
        const title = screen.getByText(/todo list/i) //melhor usar regex pois entre "" tem que ser identico, regex pode ser em CAPS, LOW e dentro de frases. (regex busca se contem esse valor no titulo)
        expect(title).toBeInTheDocument()
    })

    test("deve renderizar com input vazio", () => {
        render(<TodoList />)

        //screen.debug() 

        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toHaveValue("")
    })
    test("deve atualizar o valor do input ", async()=>{

        const user = userEvent.setup() //simula realmente uma pessoa e não um bot
        render(<TodoList />)

        //screen.debug() 

        const input = screen.getByPlaceholderText(/enter a todo/i)

        //interagir
        await user.type(input, "Revisar React")

        //assertiva acerca do valor do input
        expect(input).toHaveValue("Revisar React")
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar enter", async()=>{

        const user = userEvent.setup() 

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisão React{enter}")

        //screen.logTestingPlaygroundURL()
        const item = screen.getByText("Revisão React")

        expect(input).toHaveValue("")
        expect(item).toBeInTheDocument()

        //screen.debug()
    })

    test("deve alterar o status da tarefa  quando o botão de alterar status for clicado", async()=>{

        const user = userEvent.setup() 

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Estudar React{enter}")

        const toggleBtn = screen.getByRole('button', {name: /toggle/i} )

        const item = screen.getByText("Estudar React")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: line-through")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: none")

        //screen.debug()
    })

    test("deve remover a tarefa quando o botão de deletar for clicado", async()=>{

        const user = userEvent.setup() 

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Estudar React{enter}")

        const deleteBtn = screen.getByRole('button', {name: /delete/i} )

        const item = screen.queryByText("Estudar React")

        await user.click(deleteBtn)
        expect(item).not.toBeInTheDocument()

        //screen.debug()
    })
})

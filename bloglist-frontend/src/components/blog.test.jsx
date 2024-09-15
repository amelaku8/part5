import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect,vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe("Tests blog" , () => {
const blog = {
    url: 'efer',
    author: 'derea',
    likes: 'dfea',
    title: 'were',
    user : {
    name : "ere"
  }
  }


  test('renders blog', () => {
  
  const {container} = render(<Blog blog={blog} deleteBlog={() => null} likeHandler={() => null}/>)
    
   const div = container.querySelector(".blog_small") 
   expect(div).toBeDefined()
})

test ("renders full blog ", async () => {
    const {container} = render(<Blog blog={blog} deleteBlog={() => null} likeHandler={() => null}/>)
    const user = userEvent.setup()
    const button = screen.getByText("view")
    
    await user.click(button)
    const div = container.querySelector(".blog_full")

    expect(div).toBeDefined()
    expect(div).toHaveTextContent("likes")
  } )
test (" like button", async () => {
    const likess = vi.fn(() => null)

    render(<Blog blog={blog} deleteBlog={() => null} likeHandler={likess}/>)
    const user = userEvent.setup()
    const button1  = screen.getByText("view")
    
    await user.click(button1)
    const button = screen.getByText("like")
    
    await user.click(button)
    await user.click(button)

    expect(likess.mock.calls).toHaveLength(2)
    

  })

})

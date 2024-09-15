import { render,screen } from "@testing-library/react";
import {expect,vi} from  "vitest";
import CreateNewBlog from "./CreateNewBlog"
import userEvent from "@testing-library/user-event";

test("create new blogs works properly" , async () =>  {

    const mockHandleBlogs  = vi.fn(() => null)
    
    render(<CreateNewBlog handleNewBlog={mockHandleBlogs}/>)
    const user = userEvent.setup()
    const button1  = screen.getByText("create")
    
    await user.click(button1)
    

    expect(mockHandleBlogs.mock.calls).toHaveLength(1)
})

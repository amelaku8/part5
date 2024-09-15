import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Toggleable from './components/toggleable.jsx'
import blogService from './services/blogs'
import loginService from './services/login'



const Message = ({ msg }) => {
  if (msg) {
    return (
      <>
        {msg}
      </>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userLoggedInMessage,setUserLoggedInMessage] = useState(null)
  const [blogAddedMessage, setBlogAddedMessage] = useState(null)
  const [errmsg,setErrMsg] = useState(null)
  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(newBlogs => {
        newBlogs.sort((a,b) => b.likes - a.likes)
        setBlogs(newBlogs)
      })
  },[])


  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      console.log(user)
      blogService.setToken(user.token)
      setUser(user.username)
      console.log(user)
    }
  }, [])
  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login({ username, password })
      .then(user => {
        console.log(user)
        setUser(user.username)

        setUsername('')
        setPassword('')
        blogService.setToken(user.token)

        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        setUserLoggedInMessage(`${user.username} logged in`)
        setTimeout(() => setUserLoggedInMessage(null),5000)
      })
      .catch(() => {
        setErrMsg('Error logging in')
        setTimeout(() => setErrMsg(null), 5000)
      })

  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')

  }
  const handleNewBlog = (event) => {
    event.preventDefault()

    const blog = {

      title: event.target[0].value,
      author: event.target[1].value,
      url:event.target[2].value
    }


    blogService.create(blog)
      .then(response => {
        const  newBlogs = blogs.concat(response)
        setBlogs(newBlogs)
        setBlogAddedMessage(`${response.title} by ${response.author} added`)
        setTimeout(() => setBlogAddedMessage(null),5000)
      }
      )


  }
  const likeHandler = (blog) => {
    blogService.increaseLike(blog)
      .then(response => {
        let newBlogs = blogs.filter(b => b.id !== blog.id)

        const updatedBlog = { ...response,user:blog.user }
        newBlogs =  newBlogs.concat(updatedBlog).sort((a,b) => b.likes - a.likes)

        setBlogs(newBlogs)

      }
      )
  }
  const deleteBlog = async   (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)){
      await  blogService.deleteBlog(blog)

      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)
      setBlogAddedMessage('Blog deleted')
      setTimeout(() => setBlogAddedMessage(null),5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Message msg={errmsg} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <p> username : <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} id="username" /> </p>
          <p> password : <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} id="password" /></p>
          <p> <button type="submit" id="login">login</button></p>
        </form>
      </div>
    )
  }
  return (<div>
    <Message msg={blogAddedMessage} />
    <Message msg={userLoggedInMessage}/>
    <h2>blogs</h2>
    <p><button onClick={handleLogout} id="logout">logout</button></p>
    <Toggleable buttonLabel="New Blog" ref={newBlogRef}>
      <CreateNewBlog handleNewBlog={handleNewBlog} />
    </Toggleable>

    {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeHandler={likeHandler} deleteBlog={deleteBlog} author={user} className='blog' />
      )
    }

  </div >
  )
}

export default App

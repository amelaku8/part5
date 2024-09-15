import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteBlog ,author }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVissibility = () => {
    setVisible(!visible)
  }
  console.log(author)
  console.log(blog.user.username)

  if (visible) {
    if (author === blog.user.username){
      return (
        <div style={blogStyle} className='blog_full'>
          <p>{blog.title} {blog.author} <button onClick={toggleVissibility}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes}  <button onClick={() => likeHandler(blog)}>like</button></p>
          <p>{blog.user.name}</p>
          <p> <button onClick={() => deleteBlog(blog)} className="delete"> remove </button> </p>
        </div>
      )
    }


    return (
      <div style={blogStyle} className='blog_full'>
        <p>{blog.title} {blog.author} <button onClick={toggleVissibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes}  <button onClick={() => likeHandler(blog)}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }

  return (
    <div style={blogStyle} className = 'blog_small'>
      {blog.title} {blog.author}
      <button onClick={toggleVissibility}>view</button>
    </div>
  )
}
Blog.propTypes = {
  blog : propTypes.object.isRequired,
  likeHandler: propTypes.func.isRequired,
}
export default Blog

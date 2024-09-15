import { useState } from 'react'

const CreateNewBlog = ({handleNewBlog}) => {
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [blogUrl,setBlogUrl] = useState("")

  return (
    <div>
      <h2> create new </h2>
      <form onSubmit={handleNewBlog} > 
        <p>title <input value={title} onChange={ e   => setTitle(e.target.value)} id="title"/> </p>
        <p>author <input value={author} onChange={ e  => setAuthor(e.target.value)} id="author" /> </p>
        <p>url <input value={blogUrl} onChange={ e => setBlogUrl(e.target.value)} id="blogUrl"/> </p>
        <p><button type="submit" id='create'>create</button></p>
      </form>
    </div>

  )
}

export default CreateNewBlog


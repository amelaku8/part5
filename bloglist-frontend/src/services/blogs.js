import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {

  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}
const increaseLike = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  blog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {

  const config = {
    headers: { Authorization: token }
  }

  const  url = `${baseUrl}/${blog.id}`
  console.log(`deleting ${url} with token ${token}`)
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)

  return response
}

export default { getAll, setToken, create, increaseLike, deleteBlog }

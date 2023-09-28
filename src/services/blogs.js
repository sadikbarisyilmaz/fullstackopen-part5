import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

export const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export const createBlog = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  console.log(config);
  const request = axios.post(baseUrl, data, config)
  const response = await request
  console.log(response);
}
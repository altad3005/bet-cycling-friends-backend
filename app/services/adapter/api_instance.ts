import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.PCS_API_URL || 'http://127.0.0.1:8001',
  headers: {
    'x-api-key': process.env.PCS_API_TOKEN || 'super-secret-token',
  },
})

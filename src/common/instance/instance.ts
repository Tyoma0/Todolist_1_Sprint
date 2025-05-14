import axios from 'axios'

const token = 'a4f9ef73-96ec-4927-83d2-be16e933833d'
const apiKey = '1eff9ad0-ef89-4730-a8da-786010c5d5b2'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey,
  },
})

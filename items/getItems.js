import axios from 'axios'

export const getItems = async () => {
  const { data } = await axios.get('/catalog/list', {
    params: {
      types: 'ITEM'
    }
  })

  console.log(data)
  return data
}

export default getItems
import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
    data: faker.helpers.objectEntry({ prop1: 'value1', prop2: 'value2' }),
    status: faker.number.int({ min: 200, max: 500 })
  })
  return mockedAxios
}

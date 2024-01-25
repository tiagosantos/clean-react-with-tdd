import { AxiosHttpClient } from './axios-http-client'
import { type HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'
import { faker } from '@faker-js/faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockAxiosResult = {
  data: faker.helpers.objectEntry({ prop1: 'value1', prop2: 'value2' }),
  status: faker.number.int({ min: 200, max: 500 })
}
mockedAxios.post.mockResolvedValue(mockAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: mockAxiosResult.data
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut()
    const HttpResponse = await sut.post(mockPostRequest())
    expect(HttpResponse).toEqual({
      statusCode: mockAxiosResult.status,
      body: mockAxiosResult.data
    })
  })
})

import { Container } from 'inversify'
import { TYPES } from './inversify'
import { HttpClientImpl } from '../clients/HttpClientImpl'
import type { HttpClient } from '../clients/HttpClient'
const container = new Container()

container.bind<HttpClient>(TYPES.HttpClient).to(HttpClientImpl)

export { container }

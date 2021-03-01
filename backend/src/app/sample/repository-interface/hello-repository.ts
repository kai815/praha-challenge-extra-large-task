import { Hello } from 'src/domain/sample/entity/hello'

export interface IHelloRepository {
  save(hello: Hello): Promise<Hello>
}

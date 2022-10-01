/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGenericDao<T> {
  all(params: { skip?: number; take?: number; cursor?: any; where?: any; orderBy?: any }): Promise<T[]>

  find(userWhereUniqueInput: any): Promise<T | null>

  save(data: any): Promise<T>

  update(data: any, where: any): Promise<T>

  delete(where: any): Promise<T>
}

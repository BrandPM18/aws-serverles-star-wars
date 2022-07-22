// import { translateINFO,CustomError } from '../utils'
import { getInfoPeople } from '../network/request'
import * as uuid from "uuid";
import postService from "../database/service";

type Process = {
  type:
    | 'getPeopleWithID'
    | 'createPeopleDB'
}

type PeopleServiceResponse = string | People | PostPeople

export class PeopleService { 
  #peopleID: string
  #args: any

  constructor(peopleID: string, args: any) {
    this.#peopleID = peopleID
    this.#args = args
  }

  public process({ type }: Process): Promise<PeopleServiceResponse> {
    switch (type) {
      case 'getPeopleWithID':
        return this.#getPeopleWithID()
      case 'createPeopleDB':
        return this.#createPeopleDB()
    }
  }

  async #getPeopleWithID(): Promise<PeopleServiceResponse> {
    try {
      const response = await getInfoPeople(this.#peopleID,"Error request")
      return response

    } catch (error) {
      console.log('Errors to translate.')
      return 'Error in service People'
    }
  }

  async #createPeopleDB(): Promise<PeopleServiceResponse> {
    const  { description } = this.#args
    try {
      const people = await this.#getPeopleWithID()
      if (typeof people === 'string') {
        return 'Not Found People'
      }
      const postId: string = uuid.v4();
      const post = await postService.createPost({
        postId,
        description,
        name: people.name,
        height: people.height,
        mass: people.mass,
        createdAt: new Date().toISOString(),
      });
      return post
    } catch (error) {
      console.log('Errors to create People.')      
      console.log(error)      

      return 'Error in service People'
    }
  }
}

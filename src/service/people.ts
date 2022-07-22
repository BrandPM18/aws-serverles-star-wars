// import { translateINFO,CustomError } from '../utils'
import { getInfoPeople } from '../network/request'

type Process = {
  type:
    | 'getPeopleWithID'
}

type PeopleServiceResponse = string | any | People

export class PeopleService { 
  #peopleID: string

  constructor(peopleID: string) {
    this.#peopleID = peopleID
  }

  public process({ type }: Process): Promise<PeopleServiceResponse> {
    switch (type) {
      case 'getPeopleWithID':
        return this.#getPeopleWithID()
    }
  }

  async #getPeopleWithID(): Promise<PeopleServiceResponse> {
    try {
      const response = await getInfoPeople(this.#peopleID,"Error request");
      console.log(response);
      return 'dsdd'
    } catch (error) {
      console.log('Errors to translate.')
    }
  }
}

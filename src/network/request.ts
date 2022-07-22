import axios, { AxiosResponse } from 'axios'
import { CustomError } from '../utils'

const SWAPIurl = 'https://swapi.py4e.com/api'

const getInfoPeople = async (
  peopleID: string,
  errorMsg: string
): Promise<People> => {
  try {
    const {data} = await axios.get<People>(
      `${SWAPIurl}/people/${peopleID}`
    )
    return data
  } catch (error) {
    console.log(error)
    throw new CustomError(errorMsg)
  }
}

export {
  getInfoPeople
}
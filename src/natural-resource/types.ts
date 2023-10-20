import { GatherClass } from '../global/types'

export interface CreateResourceRequestBody {
  action: string
  args: CreateResourceInputParams
}

export interface CreateResourceInputParams {
  name: string
  itemLevel: number
  gatherClass: GatherClass
  isHidden: boolean
  locationInputs: ResourceLocationInput[]
}

export interface ResourceLocationInput {
  region: string
  zone: string
  area: string
  gatherLevel: number
}

export interface DeleteResourceInputParams {
  id?: string
  name?: string
}

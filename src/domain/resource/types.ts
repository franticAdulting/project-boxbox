import { Location } from '../location'

export interface Resource {
  id: string
  name: string
  label: string
  itemLevel: number
  gatherClass: string
  isHidden: boolean
  locations: Location[]
}

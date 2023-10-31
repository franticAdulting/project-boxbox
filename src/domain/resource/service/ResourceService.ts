import { inject, injectable } from 'inversify'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../../dependency-injection/types'
import { ResourceRepository } from '../repository/ResourceRepository'
import { Resource } from '../types'

@injectable()
export class ResourceService {
  private readonly resourceRepository: ResourceRepository

  constructor(@inject(TYPES.ResourceRepository) resourceRepository: ResourceRepository) {
    this.resourceRepository = resourceRepository
  }

  public async getResourceByName(name: string): Promise<Result<Resource | null, SError>> {
    const result = await this.resourceRepository.getResourceByName(name)

    if (result.ok && result.val != null) {
      return Ok(result.val)
    } else {
      return Ok(null)
    }
  }
}

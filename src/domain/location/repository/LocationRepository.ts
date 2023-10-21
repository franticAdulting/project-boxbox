import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Result } from 'ts-results'
import { SError } from 'verror'
import { DatabaseClient } from '../../../database'
import TYPES from '../../../dependency-injection/types'
import { Area, AreaRepository } from './AreaRepository'
import { Region, RegionRepository } from './RegionRespository'
import { Zone, ZoneRepository } from './ZoneRepository'

@injectable()
export class LocationRepository {
  private readonly prismaClient: PrismaClient
  private readonly regionRepository: RegionRepository
  private readonly zoneRepository: ZoneRepository
  private readonly areaRepository: AreaRepository

  constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
    this.regionRepository = new RegionRepository(this.prismaClient)
    this.zoneRepository = new ZoneRepository(this.prismaClient)
    this.areaRepository = new AreaRepository(this.prismaClient)
  }

  public async createRegion(name: string, label: string): Promise<Result<Region, SError>> {
    return await this.regionRepository.createRegion(name, label)
  }

  public async getRegionByName(name: string): Promise<Result<Region | null, SError>> {
    return await this.regionRepository.getRegionByName(name)
  }

  public async deleteRegionByName(name: string): Promise<Result<Region, SError>> {
    return await this.regionRepository.deleteRegionByName(name)
  }

  public async createZone(name: string, label: string, regionId: string): Promise<Result<Zone, SError>> {
    return await this.zoneRepository.createZone(name, label, regionId)
  }

  public async getZoneByName(name: string): Promise<Result<Zone | null, SError>> {
    return await this.zoneRepository.getZoneByName(name)
  }

  public async deleteZoneByName(name: string): Promise<Result<Zone, SError>> {
    return await this.zoneRepository.deleteZoneByName(name)
  }

  public async createArea(name: string, label: string, zoneId: string): Promise<Result<Area, SError>> {
    return await this.areaRepository.createArea(name, label, zoneId)
  }

  public async getAreaByName(name: string): Promise<Result<Area | null, SError>> {
    return await this.areaRepository.getAreaByName(name)
  }

  public async deleteAreaByName(name: string): Promise<Result<Area, SError>> {
    return await this.areaRepository.deleteAreaByName(name)
  }
}

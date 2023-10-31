import { PrismaClient } from '@prisma/client'
import { weaverRecipes } from './recipes'

// This file gets called automatically when performing migrations.
const prismaClient = new PrismaClient()

enum GatherClass {
  Miner = 'miner',
  Botanist = 'botanist',
}

interface RegionName {
  name: Region
  label: string
}

interface ZoneName {
  name: Zone
  label: string
  regionName: Region
}

interface AreaName {
  name: Area
  label: string
  zoneName: Zone
}

interface Resource {
  name: string
  label: string
  itemLevel: number
  gatherClass: string
  isHidden: boolean
  locations: Location[]
}

interface Location {
  region: Region
  zone: Zone
  area: Area
  gatherLevel: number
}

enum Region {
  LaNoscea = 'la-noscea',
  TheBlackShroud = 'the-black-shroud',
  Thanalan = 'thanalan',
  MorDhona = 'mor-dhona',
}

// type Zone = LaNosceaZone | TheBlackShroudZone | ThanalanZone | MorDhonaZone

enum Zone {
  // La Noscea
  MiddleLaNoscea = 'middle-la-noscea',
  LowerLaNoscea = 'lower-la-noscea',
  EasternLaNoscea = 'eastern-la-noscea',
  WesternLaNoscea = 'western-la-noscea',
  UpperLaNoscea = 'upper-la-noscea',
  OuterLaNoscea = 'outer-la-noscea',
  // The Black Shroud
  CentralShroud = 'central-shroud',
  EastShroud = 'east-shroud',
  SouthShroud = 'south-shroud',
  NorthShroud = 'north-shroud',
  // Thanalan
  WesternThanalan = 'western-thanalan',
  CentralThanalan = 'central-thanalan',
  EasternThanalan = 'eastern-thanalan',
  SouthernThanalan = 'southern-thanalan',
  NorthernThanalan = 'northern-thanalan',
  // Mor Dhona
  MorDhona = 'mor-dhona',
}

enum Area {
  // La Noscea
  ZephyrDrift = 'zephyr-drift',
  Summerford = 'summerford',
  ThreeMalmBend = 'three-malm-bend',
  MorabyBay = 'moraby-bay',
  CedarWood = 'cedarwood',
  TheGodsGrip = 'the-gods-grip',
  Bloodshore = 'bloodshore',
  RaincatcherGully = 'raincatcher-gully',
  AgelyssWise = 'agelyss-wise',
  Quarterstone = 'quarterstone',
  SkullValley = 'skull-valley',
  TheIslesOfUmbra = 'the-isles-of-umbra',
  Halfstone = 'halfstone',
  SapsaSpawningGrounds = 'sapsa-spawning-grounds',
  BronzeLake = 'bronze-lake',
  ZelmasRun = 'zelmas-run',
  Oakwood = 'oakwood',
  TheLongClimb = 'the-long-climb',
  IronLake = 'iron-lake',
  UGhamaroMines = 'ughamaro-mines',
  // The Black Shroud
  Bentbranch = 'bentbranch',
  JadeiteThick = 'jadeite-thick',
  TheStandingCorses = 'the-standing-corses',
  SorrelHaven = 'sorrel-haven',
  GreenTear = 'greentear',
  TheHoneyYard = 'the-honey-yard',
  Sylphlands = 'sylphlands',
  NineIvies = 'nine-ivies',
  TheBramblePatch = 'the-bramble-patch',
  LowerPaths = 'lower-paths',
  SilentArbor = 'silent-arbor',
  UpperPaths = 'upper-paths',
  UrthsGift = 'urths-gift',
  AlderSprings = 'alder-springs',
  FallgourdFloat = 'fallgourd-float',
  Treespeak = 'treespeak',
  Peacegarden = 'peacegarden',
  ProudCreek = 'proud-creek',
  // Thanalan
  TheEightySinsOfSasamo = 'the-eighty-sins-of-sasamo',
  Hammerlea = 'hammerlea',
  HorizonsEdge = 'horizons-edge',
  TheFootfalls = 'the-footfalls',
  CapeWestwind = 'cape-westwind',
  SpinelessBasin = 'spineless-basin',
  TheClutch = 'the-clutch',
  BlackBrush = 'black-brush',
  WellwickWood = 'wellwick-wood',
  TheBurningWall = 'the-burning-wall',
  Sandgate = 'sandgate',
  Drybone = 'drybone',
  SagoliiDesert = 'sagolii-desert',
  TheRedLabyrinth = 'the-red-labyrinth',
  Zanrak = 'zanrak',
  Zaharak = 'zaharak',
  BrokenWater = 'broken-water',
  Bluefog = 'bluefog',
  RaubahnsPush = 'raubahns-push',
  // Mor Dhona
  Fogfens = 'fogfens',
  RevenantsToll = 'revenants-toll',
  NorthSilverTear = 'north-silvertear',
  TheEightSentinels = 'the-eight-sentinels',
}

const regions: RegionName[] = [
  { name: Region.LaNoscea, label: 'La Noscea' },
  { name: Region.TheBlackShroud, label: 'The Black Shroud' },
  { name: Region.Thanalan, label: 'Thanalan' },
  { name: Region.MorDhona, label: 'Mor Dhona' },
]

const zones: ZoneName[] = [
  { name: Zone.MiddleLaNoscea, label: 'Middle La Noscea', regionName: Region.LaNoscea },
  { name: Zone.LowerLaNoscea, label: 'Lower La Noscea', regionName: Region.LaNoscea },
  { name: Zone.EasternLaNoscea, label: 'Eastern La Noscea', regionName: Region.LaNoscea },
  { name: Zone.WesternLaNoscea, label: 'Western La Noscea', regionName: Region.LaNoscea },
  { name: Zone.UpperLaNoscea, label: 'Upper La Noscea', regionName: Region.LaNoscea },
  { name: Zone.OuterLaNoscea, label: 'Outer La Noscea', regionName: Region.LaNoscea },
  { name: Zone.CentralShroud, label: 'Central Shroud', regionName: Region.TheBlackShroud },
  { name: Zone.EastShroud, label: 'East Shroud', regionName: Region.TheBlackShroud },
  { name: Zone.SouthShroud, label: 'South Shroud', regionName: Region.TheBlackShroud },
  { name: Zone.NorthShroud, label: 'North Shroud', regionName: Region.TheBlackShroud },
  { name: Zone.WesternThanalan, label: 'Western Thanalan', regionName: Region.Thanalan },
  { name: Zone.CentralThanalan, label: 'Central Thanalan', regionName: Region.Thanalan },
  { name: Zone.EasternThanalan, label: 'Eastern Thanalan', regionName: Region.Thanalan },
  { name: Zone.SouthernThanalan, label: 'Southern Thanalan', regionName: Region.Thanalan },
  { name: Zone.NorthernThanalan, label: 'Northern Thanalan', regionName: Region.Thanalan },
  { name: Zone.MorDhona, label: 'Mor Dhona', regionName: Region.MorDhona },
]

const laNosceaAreas: AreaName[] = [
  { name: Area.ZephyrDrift, label: 'Zephyr Drift', zoneName: Zone.MiddleLaNoscea },
  { name: Area.Summerford, label: 'Summerford', zoneName: Zone.MiddleLaNoscea },
  { name: Area.ThreeMalmBend, label: 'Three-malm Bend', zoneName: Zone.MiddleLaNoscea },
  { name: Area.MorabyBay, label: 'Moraby Bay', zoneName: Zone.LowerLaNoscea },
  { name: Area.CedarWood, label: 'Cedarwood', zoneName: Zone.LowerLaNoscea },
  { name: Area.TheGodsGrip, label: "The God's Grip", zoneName: Zone.LowerLaNoscea },
  { name: Area.Bloodshore, label: 'Bloodshore', zoneName: Zone.EasternLaNoscea },
  { name: Area.RaincatcherGully, label: 'Raincatcher Gully', zoneName: Zone.EasternLaNoscea },
  { name: Area.AgelyssWise, label: 'Agelyss Wise', zoneName: Zone.EasternLaNoscea },
  { name: Area.Quarterstone, label: 'Quarterstone', zoneName: Zone.WesternLaNoscea },
  { name: Area.SkullValley, label: 'Skull Valley', zoneName: Zone.WesternLaNoscea },
  { name: Area.TheIslesOfUmbra, label: 'The Isles of Umbra', zoneName: Zone.WesternLaNoscea },
  { name: Area.Halfstone, label: 'Halfstone', zoneName: Zone.WesternLaNoscea },
  { name: Area.SapsaSpawningGrounds, label: 'Sapsa Spawning Grounds', zoneName: Zone.WesternLaNoscea },
  { name: Area.BronzeLake, label: 'Bronze Lake', zoneName: Zone.UpperLaNoscea },
  { name: Area.ZelmasRun, label: "Zelma's Run", zoneName: Zone.UpperLaNoscea },
  { name: Area.Oakwood, label: 'Oakwood', zoneName: Zone.UpperLaNoscea },
  { name: Area.TheLongClimb, label: 'The Long Climb', zoneName: Zone.OuterLaNoscea },
  { name: Area.IronLake, label: 'Iron Lake', zoneName: Zone.OuterLaNoscea },
  { name: Area.UGhamaroMines, label: "U'Ghamaro Mines", zoneName: Zone.OuterLaNoscea },
]

const theBlackShroudAreas: AreaName[] = [
  { name: Area.Bentbranch, label: 'Bentbranch', zoneName: Zone.CentralShroud },
  { name: Area.JadeiteThick, label: 'Jadeite thick', zoneName: Zone.CentralShroud },
  {
    name: Area.TheStandingCorses,
    label: 'The Standing Corses',
    zoneName: Zone.CentralShroud,
  },
  { name: Area.SorrelHaven, label: 'Sorrel Haven', zoneName: Zone.CentralShroud },
  { name: Area.GreenTear, label: 'Green Tear', zoneName: Zone.CentralShroud },
  { name: Area.TheHoneyYard, label: 'The Honey Yard', zoneName: Zone.EastShroud },
  { name: Area.Sylphlands, label: 'Sylphlands', zoneName: Zone.EastShroud },
  { name: Area.NineIvies, label: 'Nine Ivies', zoneName: Zone.EastShroud },
  { name: Area.TheBramblePatch, label: 'The Bramble Patch', zoneName: Zone.EastShroud },
  { name: Area.LowerPaths, label: 'Lower Paths', zoneName: Zone.SouthShroud },
  { name: Area.SilentArbor, label: 'Silent Arbor', zoneName: Zone.SouthShroud },
  { name: Area.UpperPaths, label: 'Upper Paths', zoneName: Zone.SouthShroud },
  { name: Area.UrthsGift, label: "Urth's Gift", zoneName: Zone.SouthShroud },
  { name: Area.AlderSprings, label: 'Alder Springs', zoneName: Zone.NorthShroud },
  { name: Area.FallgourdFloat, label: 'Fallgourd Float', zoneName: Zone.NorthShroud },
  { name: Area.Treespeak, label: 'Treespeak', zoneName: Zone.NorthShroud },
  { name: Area.Peacegarden, label: 'Peacegarden', zoneName: Zone.NorthShroud },
  { name: Area.ProudCreek, label: 'Proud Creek', zoneName: Zone.NorthShroud },
]

const thanalanAreas: AreaName[] = [
  {
    name: Area.TheEightySinsOfSasamo,
    label: 'The Eighty Sins of Sasamo',
    zoneName: Zone.WesternThanalan,
  },
  { name: Area.Hammerlea, label: 'Hammerlea', zoneName: Zone.WesternThanalan },
  { name: Area.HorizonsEdge, label: "Horizon's Edge", zoneName: Zone.WesternThanalan },
  { name: Area.TheFootfalls, label: 'The Footfalls', zoneName: Zone.WesternThanalan },
  { name: Area.CapeWestwind, label: 'Cape Westwind', zoneName: Zone.WesternThanalan },
  { name: Area.SpinelessBasin, label: 'Spineless Basin', zoneName: Zone.CentralThanalan },
  { name: Area.TheClutch, label: 'The Clutch', zoneName: Zone.CentralThanalan },
  { name: Area.BlackBrush, label: 'Black Brush', zoneName: Zone.CentralThanalan },
  { name: Area.WellwickWood, label: 'Wellwick Wood', zoneName: Zone.EasternThanalan },
  { name: Area.TheBurningWall, label: 'The Burning Wall', zoneName: Zone.EasternThanalan },
  { name: Area.Sandgate, label: 'Sandgate', zoneName: Zone.EasternThanalan },
  { name: Area.Drybone, label: 'Drybone', zoneName: Zone.EasternThanalan },
  { name: Area.SagoliiDesert, label: 'Sagolii Desert', zoneName: Zone.SouthernThanalan },
  { name: Area.TheRedLabyrinth, label: 'The Red Labyrinth', zoneName: Zone.SouthernThanalan },
  { name: Area.Zanrak, label: "Zanr'ak", zoneName: Zone.SouthernThanalan },
  { name: Area.Zaharak, label: "Zahar'ak", zoneName: Zone.SouthernThanalan },
  { name: Area.BrokenWater, label: 'Broken Water', zoneName: Zone.SouthernThanalan },
  { name: Area.Bluefog, label: 'Bluefog', zoneName: Zone.NorthernThanalan },
  { name: Area.RaubahnsPush, label: "Raubahn's Push", zoneName: Zone.NorthernThanalan },
]

const morDhonaAreas: AreaName[] = [
  { name: Area.Fogfens, label: 'Fogfens', zoneName: Zone.MorDhona },
  { name: Area.RevenantsToll, label: "Revenant's Toll", zoneName: Zone.MorDhona },
  { name: Area.NorthSilverTear, label: 'North Silvertear', zoneName: Zone.MorDhona },
  { name: Area.TheEightSentinels, label: 'The Eight Sentinels', zoneName: Zone.MorDhona },
]

const resources: Resource[] = [
  {
    name: 'latex',
    label: 'Latex',
    itemLevel: 1,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.Thanalan,
        zone: Zone.WesternThanalan,
        area: Area.Hammerlea,
        gatherLevel: 5,
      },
      {
        region: Region.Thanalan,
        zone: Zone.CentralThanalan,
        area: Area.SpinelessBasin,
        gatherLevel: 5,
      },
    ],
  },
  {
    name: 'allagan-snail',
    label: 'Allagan Snail',
    itemLevel: 2,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.JadeiteThick,
        gatherLevel: 5,
      },
    ],
  },
  {
    name: 'maple-sap',
    label: 'Maple Sap',
    itemLevel: 2,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 5,
      },
    ],
  },
  {
    name: 'maple-log',
    label: 'Maple Log',
    itemLevel: 3,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.JadeiteThick,
        gatherLevel: 5,
      },
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 5,
      },
    ],
  },
  {
    name: 'cinnamon',
    label: 'Cinnamon',
    itemLevel: 4,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 5,
      },
    ],
  },
  {
    name: 'maple-branch',
    label: 'Maple Branch',
    itemLevel: 5,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.JadeiteThick,
        gatherLevel: 5,
      },
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 5,
      },
    ],
  },
  {
    name: 'beehive-chip',
    label: 'Beehive Chip',
    itemLevel: 5,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 5,
      },
    ],
  },
  {
    name: 'cock-feather',
    label: 'Cock Feather',
    itemLevel: 6,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.Thanalan,
        zone: Zone.CentralThanalan,
        area: Area.SpinelessBasin,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'tinolqa-mistletoe',
    label: 'Tinolqa Mistletoe',
    itemLevel: 6,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.GreenTear,
        gatherLevel: 10,
      },
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'la-noscean-orange',
    label: 'La Noscean Orange',
    itemLevel: 7,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.LaNoscea,
        zone: Zone.LowerLaNoscea,
        area: Area.CedarWood,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'la-noscean-orange-seeds',
    label: 'La Noscean Orange Seeds',
    itemLevel: 7,
    gatherClass: GatherClass.Botanist,
    isHidden: true,
    locations: [
      {
        region: Region.LaNoscea,
        zone: Zone.LowerLaNoscea,
        area: Area.CedarWood,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'ash-log',
    label: 'Ash Log',
    itemLevel: 8,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.GreenTear,
        gatherLevel: 10,
      },
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'kukuru-bean',
    label: 'Kukuru Bean',
    itemLevel: 9,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.LaNoscea,
        zone: Zone.LowerLaNoscea,
        area: Area.CedarWood,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'ash-branch',
    label: 'Ash Branch',
    itemLevel: 9,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.GreenTear,
        gatherLevel: 10,
      },
      {
        region: Region.TheBlackShroud,
        zone: Zone.NorthShroud,
        area: Area.Treespeak,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'cloves',
    label: 'Cloves',
    itemLevel: 10,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.Thanalan,
        zone: Zone.CentralThanalan,
        area: Area.SpinelessBasin,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'crow-feather',
    label: 'Crow Feather',
    itemLevel: 10,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.GreenTear,
        gatherLevel: 10,
      },
    ],
  },
  {
    name: 'elm-log',
    label: 'Elm Log',
    itemLevel: 12,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.Bentbranch,
        gatherLevel: 15,
      },
    ],
  },
  {
    name: 'gridanian-chestnut',
    label: 'Gridanian Chestnut',
    itemLevel: 14,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.CentralShroud,
        area: Area.Bentbranch,
        gatherLevel: 15,
      },
    ],
  },
  {
    name: 'faerie-apple',
    label: 'Faerie Apple',
    itemLevel: 16,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.EastShroud,
        area: Area.NineIvies,
        gatherLevel: 20,
      },
    ],
  },
  {
    name: 'faerie-apple-seeds',
    label: 'Faerie Apple Seeds',
    itemLevel: 16,
    gatherClass: GatherClass.Botanist,
    isHidden: true,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.EastShroud,
        area: Area.NineIvies,
        gatherLevel: 20,
      },
    ],
  },
  {
    name: 'sun-lemon',
    label: 'Sun Lemon',
    itemLevel: 17,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.LaNoscea,
        zone: Zone.LowerLaNoscea,
        area: Area.CedarWood,
        gatherLevel: 20,
      },
    ],
  },
  {
    name: 'sun-lemon-seeds',
    label: 'Sun Lemon Seeds',
    itemLevel: 17,
    gatherClass: GatherClass.Botanist,
    isHidden: true,
    locations: [
      {
        region: Region.LaNoscea,
        zone: Zone.LowerLaNoscea,
        area: Area.CedarWood,
        gatherLevel: 20,
      },
    ],
  },
  {
    name: 'nopales',
    label: 'Nopales',
    itemLevel: 18,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.Thanalan,
        zone: Zone.CentralThanalan,
        area: Area.BlackBrush,
        gatherLevel: 20,
      },
    ],
  },
  {
    name: 'yew-log',
    label: 'Yew Log',
    itemLevel: 19,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.EastShroud,
        area: Area.NineIvies,
        gatherLevel: 20,
      },
    ],
  },
  {
    name: 'yew-branch',
    label: 'Yew Branch',
    itemLevel: 20,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.TheBlackShroud,
        zone: Zone.EastShroud,
        area: Area.NineIvies,
        gatherLevel: 20,
      },
    ],
  },
  {
    name: 'grade-1-carbonized-matter',
    label: 'Grade 1 Carbonized Matter',
    itemLevel: 20,
    gatherClass: GatherClass.Botanist,
    isHidden: false,
    locations: [
      {
        region: Region.LaNoscea,
        zone: Zone.WesternLaNoscea,
        area: Area.SkullValley,
        gatherLevel: 20,
      },
    ],
  },
]

async function seedRegions(regions: RegionName[]) {
  await Promise.all(
    regions.map(async (region) => {
      const { name, label } = region
      await prismaClient.region.create({
        data: {
          name,
          label,
        },
      })
    })
  )
}

async function seedZones(zones: ZoneName[]) {
  await Promise.all(
    zones.map(async (zone) => {
      const { name, label, regionName } = zone
      await prismaClient.zone.create({
        data: {
          name,
          label,
          region: {
            connect: {
              name: regionName,
            },
          },
        },
      })
    })
  )
}

async function seedAreas(areas: AreaName[]) {
  await Promise.all(
    areas.map(async (area) => {
      const { name, label, zoneName } = area
      await prismaClient.area.create({
        data: {
          name,
          label,
          zone: {
            connect: {
              name: zoneName,
            },
          },
        },
      })
    })
  )
}

async function seedResources(resources: Resource[]): Promise<number> {
  // Use for-of loop for sequential async calls.
  // Use .map with Promise.all for parallel async calls.
  let locationsCreated = 0
  for (const resource of resources) {
    const { name, label, itemLevel, gatherClass, isHidden, locations } = resource

    const locationIds: string[] = []
    for (const location of locations) {
      const existingLocation = await prismaClient.location.findFirst({
        where: {
          region_name: location.region,
          zone_name: location.zone,
          area_name: location.area,
          gather_level: location.gatherLevel,
        },
      })

      if (existingLocation?.id != null) {
        locationIds.push(existingLocation.id)
      } else {
        const newLocation = await prismaClient.location.create({
          data: {
            region_name: location.region,
            zone_name: location.zone,
            area_name: location.area,
            gather_level: location.gatherLevel,
          },
        })

        locationIds.push(newLocation.id)
        locationsCreated += 1
      }
    }

    const connectedLocations: { location: { connect: { id: string } } }[] = locationIds.map((id) => {
      return { location: { connect: { id } } }
    })

    await prismaClient.resource.create({
      data: {
        name,
        label,
        item_level: itemLevel,
        gather_class: gatherClass,
        is_hidden: isHidden,
        resource_locations: {
          create: connectedLocations,
        },
      },
    })
  }

  return locationsCreated
}

async function seedRecipes() {
  for (const recipe of weaverRecipes) {
    const { name, label, itemLevel, crafterClass, yields, materials } = recipe

    const materialIds: string[] = []

    for (const material of materials) {
      const { name, amount, type } = material

      const existingMaterial = await prismaClient.material.findFirst({
        where: {
          name,
          amount,
        },
      })

      if (existingMaterial == null) {
        const newMaterial = await prismaClient.material.create({
          data: {
            name,
            amount,
            type,
          },
        })

        materialIds.push(newMaterial.id)
      } else {
        materialIds.push(existingMaterial.id)
      }
    }

    await prismaClient.recipe.create({
      data: {
        name,
        label,
        item_level: itemLevel,
        crafter_class: crafterClass,
        yields,
        materials: {
          connect: materialIds.map((materialId) => {
            return { id: materialId }
          }),
        },
      },
    })
  }
}

async function seed() {
  await seedRegions(regions)
  console.log(`'${regions.length}' regions created.`)

  await seedZones(zones)
  console.log(`'${zones.length}' zones created.`)

  await seedAreas(laNosceaAreas)
  await seedAreas(theBlackShroudAreas)
  await seedAreas(thanalanAreas)
  await seedAreas(morDhonaAreas)

  const areasCount = laNosceaAreas.length + theBlackShroudAreas.length + thanalanAreas.length + morDhonaAreas.length
  console.log(`'${areasCount}' areas created.`)

  const locationsCreated = await seedResources(resources)
  console.log(`'${resources.length}' resources created.`)
  console.log(`'${locationsCreated}' locations created.`)

  await seedRecipes()
  console.log(`'${weaverRecipes.length}' recipes created.`)
}

seed()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prismaClient.$disconnect()
    process.exit(1)
  })

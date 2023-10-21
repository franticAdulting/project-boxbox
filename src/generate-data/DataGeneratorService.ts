// This file is meant to exist outside the scope of the codebase.
// This service generates all the static data that is meant for the database.
interface Region {
  name: string
  label: string
}

interface Zone {
  name: string
  label: string
  regionName: string
}

interface Area {
  name: string
  label: string
  zoneName: string
}

export class DataGeneratorService {
  private readonly regions: Region[] = [
    { name: 'la-noscea', label: 'La Noscea' },
    { name: 'the-black-shroud', label: 'The Black Shroud' },
    { name: 'thanalan', label: 'Thanalan' },
    { name: 'mor-dhona', label: 'Mor Dhona' },
  ]

  private readonly zones: Zone[] = [
    { name: 'middle-la-noscea', label: 'Middle La Noscea', regionName: 'la-noscea' },
    { name: 'lower-la-noscea', label: 'Lower La Noscea', regionName: 'la-noscea' },
    { name: 'eastern-la-noscea', label: 'Eastern La Noscea', regionName: 'la-noscea' },
    { name: 'western-la-noscea', label: 'Western La Noscea', regionName: 'la-noscea' },
    { name: 'upper-la-noscea', label: 'Upper La Noscea', regionName: 'la-noscea' },
    { name: 'outer-la-noscea', label: 'Outer La Noscea', regionName: 'la-noscea' },
    { name: 'central-shroud', label: 'Central Shroud', regionName: 'the-black-shroud' },
    { name: 'east-shroud', label: 'East Shroud', regionName: 'the-black-shroud' },
    { name: 'south-shroud', label: 'South Shroud', regionName: 'the-black-shroud' },
    { name: 'north-shroud', label: 'North Shroud', regionName: 'the-black-shroud' },
    { name: 'western-thanalan', label: 'Western Thanalan', regionName: 'thanalan' },
    { name: 'central-thanalan', label: 'Central Thanalan', regionName: 'thanalan' },
    { name: 'eastern-thanalan', label: 'Eastern Thanalan', regionName: 'thanalan' },
    { name: 'southern-thanalan', label: 'Southern Thanalan', regionName: 'thanalan' },
    { name: 'northern-thanalan', label: 'Northern Thanalan', regionName: 'thanalan' },
    { name: 'mor-dhona', label: 'Mor Dhona', regionName: 'mor-dhona' },
  ]

  private readonly laNosceaAreas: Area[] = [
    { name: 'zephyr-drift', label: 'Zephyr Drift', zoneName: 'middle-la-noscea' },
    { name: 'summerford', label: 'Summerford', zoneName: 'middle-la-noscea' },
    { name: 'three-malm-bend', label: 'Three-malm Bend', zoneName: 'middle-la-noscea' },
    { name: 'moraby-bay', label: 'Moraby Bay', zoneName: 'lower-la-noscea' },
    { name: 'cedarwood', label: 'Cedarwood', zoneName: 'lower-la-noscea' },
    { name: 'the-gods-grip', label: "The God's Grip", zoneName: 'lower-la-noscea' },
    { name: 'bloodshore', label: 'Bloodshore', zoneName: 'eastern-la-noscea' },
    { name: 'raincatcher-gully', label: 'Raincatcher Gully', zoneName: 'eastern-la-noscea' },
    { name: 'agelyss-wise', label: 'Agelyss Wise', zoneName: 'eastern-la-noscea' },
    { name: 'quarterstone', label: 'Quarterstone', zoneName: 'western-la-noscea' },
    { name: 'skull-valley', label: 'Skull Valley', zoneName: 'western-la-noscea' },
    { name: 'the-isles-of-umbra', label: 'The Isles of Umbra', zoneName: 'western-la-noscea' },
    { name: 'halfstone', label: 'Halfstone', zoneName: 'western-la-noscea' },
    { name: 'sapsa-spawning-grounds', label: 'Sapsa Spawning Grounds', zoneName: 'western-la-noscea' },
    { name: 'bronze-lake', label: 'Bronze Lake', zoneName: 'upper-la-noscea' },
    { name: 'zelmas-run', label: "Zelma's Run", zoneName: 'upper-la-noscea' },
    { name: 'oakwood', label: 'Oakwood', zoneName: 'upper-la-noscea' },
    { name: 'the-long-climb', label: 'The Long Climb', zoneName: 'outer-la-noscea' },
    { name: 'iron-lake', label: 'Iron Lake', zoneName: 'outer-la-noscea' },
    { name: 'ughamaro-mines', label: "U'Ghamaro Mines", zoneName: 'outer-la-noscea' },
  ]

  private readonly theBlackShroudAreas: Area[] = [
    { name: 'bentbranch', label: 'Bentbranch', zoneName: 'central-shroud' },
    { name: 'jadeite-thick', label: 'Jadeite thick', zoneName: 'central-shroud' },
    { name: 'the-standing-corses', label: 'The Standing Corses', zoneName: 'central-shroud' },
    { name: 'sorrel-haven', label: 'Sorrel Haven', zoneName: 'central-shroud' },
    { name: 'greentear', label: 'Green Tear', zoneName: 'central-shroud' },
    { name: 'the-honey-yard', label: 'The Honey Yard', zoneName: 'east-shroud' },
    { name: 'sylphlands', label: 'Sylphlands', zoneName: 'east-shroud' },
    { name: 'nine-ivies', label: 'Nine Ivies', zoneName: 'east-shroud' },
    { name: 'the-bramble-patch', label: 'The Bramble Patch', zoneName: 'east-shroud' },
    { name: 'lower-paths', label: 'Lower Paths', zoneName: 'south-shroud' },
    { name: 'silent-arbor', label: 'Silent Arbor', zoneName: 'south-shroud' },
    { name: 'upper-paths', label: 'Upper Paths', zoneName: 'south-shroud' },
    { name: 'urths-gift', label: "Urth's Gift", zoneName: 'south-shroud' },
    { name: 'alder-springs', label: 'Alder Springs', zoneName: 'north-shroud' },
    { name: 'fallgourd-float', label: 'Fallgourd Float', zoneName: 'north-shroud' },
    { name: 'treespeak', label: 'Treespeak', zoneName: 'north-shroud' },
    { name: 'peacegarden', label: 'Peacegarden', zoneName: 'north-shroud' },
    { name: 'proud-creek', label: 'Proud Creek', zoneName: 'north-shroud' },
  ]

  private readonly thanalanAreas: Area[] = [
    { name: 'the-eighty-sins-of-sasamo', label: 'The Eighty Sins of Sasamo', zoneName: 'western-thanalan' },
    { name: 'hammerlea', label: 'Hammerlea', zoneName: 'western-thanalan' },
    { name: 'horizons-edge', label: "Horizon's Edge", zoneName: 'western-thanalan' },
    { name: 'the-footfalls', label: 'The Footfalls', zoneName: 'western-thanalan' },
    { name: 'cape-westwind', label: 'Cape Westwind', zoneName: 'western-thanalan' },
    { name: 'spineless-basin', label: 'Spineless Basin', zoneName: 'central-thanalan' },
    { name: 'the-clutch', label: 'The Clutch', zoneName: 'central-thanalan' },
    { name: 'black-brush', label: 'Black Brush', zoneName: 'central-thanalan' },
    { name: 'wellwick-wood', label: 'Wellwick Wood', zoneName: 'eastern-thanalan' },
    { name: 'the-burning-wall', label: 'The Burning Wall', zoneName: 'eastern-thanalan' },
    { name: 'sandgate', label: 'Sandgate', zoneName: 'eastern-thanalan' },
    { name: 'drybone', label: 'Drybone', zoneName: 'eastern-thanalan' },
    { name: 'sagolii-desert', label: 'Sagolii Desert', zoneName: 'southern-thanalan' },
    { name: 'the-red-labyrinth', label: 'The Red Labyrinth', zoneName: 'southern-thanalan' },
    { name: 'zanrak', label: "Zanr'ak", zoneName: 'southern-thanalan' },
    { name: 'zaharak', label: "Zahar'ak", zoneName: 'southern-thanalan' },
    { name: 'broken-water', label: 'Broken Water', zoneName: 'southern-thanalan' },
    { name: 'bluefog', label: 'Bluefog', zoneName: 'northern-thanalan' },
    { name: 'raubahns-push', label: "Raubahn's Push", zoneName: 'northern-thanalan' },
  ]

  private readonly morDhonaAreas: Area[] = [
    { name: 'fogfens', label: 'Fogfens', zoneName: 'mor-dhona' },
    { name: 'revenants-toll', label: "Revenant's Toll", zoneName: 'mor-dhona' },
    { name: 'north-silvertear', label: 'North Silvertear', zoneName: 'mor-dhona' },
    { name: 'the-eight-sentinels', label: 'The Eight Sentinels', zoneName: 'mor-dhona' },
  ]
}

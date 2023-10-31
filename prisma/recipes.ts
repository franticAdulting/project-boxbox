export enum CrafterClass {
  Carpenter = 'carpenter',
  Blacksmith = 'blacksmith',
  Armorer = 'armorer',
  Goldsmith = 'goldsmith',
  Leatherworker = 'leatherworker',
  Weaver = 'weaver',
  Alchemist = 'alchemist',
  Culinarian = 'culinarian',
}

export enum MaterialType {
  Found = 'found',
  Crafted = 'crafted',
}

export const weaverRecipes = [
  {
    name: 'hempen-yarn',
    label: 'Hempen Yarn',
    itemLevel: 1,
    crafterClass: CrafterClass.Weaver,
    yields: 2,
    materials: [
      {
        name: 'moko-grass',
        amount: 2,
        type: MaterialType.Found,
      },
    ],
  },
  {
    name: 'undyed-hempen-cloth',
    label: 'Undyed Hempen Cloth',
    itemLevel: 2,
    crafterClass: CrafterClass.Weaver,
    yields: 1,
    materials: [
      {
        name: 'hempen-yarn',
        amount: 2,
        type: MaterialType.Crafted,
      },
    ],
  },
  {
    name: 'hempen-halfgloves',
    label: 'Hempen Halfgloves',
    itemLevel: 2,
    crafterClass: CrafterClass.Weaver,
    yields: 1,
    materials: [
      {
        name: 'undyed-hempen-cloth',
        amount: 1,
        type: MaterialType.Crafted,
      },
      {
        name: 'hempen-yarn',
        amount: 1,
        type: MaterialType.Crafted,
      },
    ],
  },
]

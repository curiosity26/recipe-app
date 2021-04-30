import { CookMethod } from '../../api'

export const cookMethodLabels: Record<CookMethod, string> = {
  [CookMethod.BAKING]: 'Baking',
  [CookMethod.FRYING]: 'Frying',
  [CookMethod.GRILLING]: 'Grilling',
  [CookMethod.ROASTING]: 'Roasting',
  [CookMethod.BROILING]: 'Broiling',
  [CookMethod.BLANCHING]: 'Blanching',
  [CookMethod.STEAMING]: 'Steaming',
  [CookMethod.SIMMERING]: 'Simmering',
  [CookMethod.BRAISING]: 'Braising',
  [CookMethod.STEWING]: 'Stewing',
  [CookMethod.POACHING]: 'Poaching',
}

export const getCookMethodLabel = (cookMethod: CookMethod) =>
  cookMethodLabels[cookMethod]

import { RegionKey } from "./types"

// Central place to manage all registrant counts
// This will eventually be replaced with database/API calls

interface RegistrantCounts {
  [regionKey: string]: {
    [villageId: string]: number
  }
}

// Mock data - replace with actual database queries
const MOCK_REGISTRANTS: RegistrantCounts = {
  nazareth: {
    "Ma'lul": 143,
    "Nazareth": 2847,
    "Saffuriyya": 287,
    "al-Mujaydil": 156,
    "indur": 92
  },
  baysan: {
    "Baysan": 1834,
    "Sirin": 267,
    "al-Tira": 189,
    "al-Taqa, Khirbot": 134,
    "Danna": 198,
    "al-Bira": 145,
    "Kawkab al-Hawa": 176,
    "Kafra": 123,
    "al-Zawiya, Khirbat": 87,
    "Umm Sabuna, Khirbat": 94,
    "Yubla": 156,
    "Jabbul": 178,
    "al-Murassas": 112,
    "al-Hamidiyya": 203,
    "Arab al-Bawati": 145,
    "al-sakhina": 167,
    "Tall al-Shawk": 89,
    "al-Ashrafiyya": 134,
    "Umm 'Ajra": 98,
    "Farwana": 145,
    "Masil al-Jizl": 76,
    "Arab al-'Arida": 123,
    "Arab al-Safa": 101,
    "al-Samiriyya": 156,
    "al-Hamra": 178,
    "al-Khunayzir": 87,
    "al-Fatur": 134,
    "al-Ghazzawiyya": 156,
    "Zab'a": 198,
    "Qumya": 145
  },
  gaza: {
    "Gaza": 3245,
    "Arab Suqir": 156,
    "Barqa": 234,
    "Yasur": 189,
    "al-Batani al-Gharbi": 167,
    "Isdud": 298,
    "al-Batani al-Sharqi": 145,
    "al-Masmiyya al-Kabira": 267,
    "al-Masmiyya al-Saghira": 134,
    "Qastina": 212,
    "Tall al-Turmus": 98,
    "Bayt Daras": 245,
    "al-Sawafir al-Sharqiyya": 178,
    "Hamama": 156,
    "al-Sawafir al-Gharbiyya": 189,
    "Julis": 234,
    "Ibdis": 167,
    "Summil": 123,
    "Jusayr": 145,
    "Bayt 'Affa": 198,
    "al-Jura": 267,
    "Hatta": 134,
    "Iraq Suwaydan": 245,
    "Karatiyya": 156,
    "al-Khisas": 178,
    "Ni'ilya": 189,
    "al-Jiyya": 212,
    "Barbara": 234,
    "Bayt Tima": 167,
    "Kawkaba": 145,
    "al-Faluja": 298,
    "Hiribya": 123,
    "Bayt Jirja": 189,
    "Hulayqat": 156,
    "Dayr Sunayd": 267,
    "Simsim": 198,
    "Dimra": 134,
    "Najd": 178,
    "Kawfakha": 145,
    "al-Muharraqa": 167,
    "Huj": 212,
    "Burayr": 234,
    "Iraq al-Manshiyya": 189,
    "al-Sawafir al-Shamaliyya": 156,
    "al-Jaladiyya": 178,
    "Bi'lin": 145
  }
}

/**
 * Get registrant count for a specific village in a region
 */
export function getVillageRegistrants(regionKey: RegionKey, villageId: string): number {
  return MOCK_REGISTRANTS[regionKey]?.[villageId] || 0
}

/**
 * Get all registrant counts for a region
 */
export function getRegionRegistrants(regionKey: RegionKey): Record<string, number> {
  return MOCK_REGISTRANTS[regionKey] || {}
}

/**
 * Get total registrants for a region
 */
export function getTotalRegionRegistrants(regionKey: RegionKey): number {
  const regionCounts = MOCK_REGISTRANTS[regionKey] || {}
  return Object.values(regionCounts).reduce((total, count) => total + count, 0)
}

/**
 * Future: Replace with database query
 * 
 * export async function getVillageRegistrantsFromDB(regionKey: RegionKey, villageId: string): Promise<number> {
 *   const result = await db.registrations.count({
 *     where: {
 *       region: regionKey,
 *       village: villageId
 *     }
 *   })
 *   return result
 * }
 */
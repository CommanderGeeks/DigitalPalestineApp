// Core types for the region system

export interface VillageData {
  id: string
  name: string
  registrants: number
  description: string
}

export interface RegionConfig {
  title: string
  arabicName: string
  description: string
  svgViewBox: string
  svgDimensions: {
    width: number
    height: number
  }
}

export type RegionKey =
  | "safad"
  | "acre"
  | "haifa"
  | "tiberias"
  | "nazareth"
  | "baysan"
  | "jenin"
  | "nablus"
  | "tulkarm"
  | "jaffa"
  | "alramla"
  | "ramallah"
  | "jerusalem"
  | "gaza"
  | "hebron"
  | "beersheba"

export interface RegionMeta {
  title: string
  blurb: string
}

export interface TooltipData {
  village: VillageData
  x: number
  y: number
}
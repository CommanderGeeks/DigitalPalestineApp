// Core types for the region system

export interface VillageData {
  id: string
  name: string
  description: string
}

export interface VillageWithRegistrants extends VillageData {
  registrants: number
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
  village: VillageWithRegistrants
  x: number
  y: number
}
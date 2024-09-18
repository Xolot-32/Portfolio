import { LucideIcon } from 'lucide-react'
import { StaticImageData } from 'next/image'

export interface NavItem {
  name: string
  href: string
  icon: LucideIcon
}

export interface Skill {
  icon: LucideIcon
  title: string
  description: string
  longDescription: string
  image:string
}

export interface Technology {
  name: string
  icon: string
}
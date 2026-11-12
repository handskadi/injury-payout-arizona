import { Car, CircleHelp, Dog, HardHat, PersonStanding, Stethoscope, Truck, type LucideIcon } from "lucide-react";
import type { CategoryId } from "@/content/categories";

export const categoryIcons: Record<CategoryId, LucideIcon> = {
  car: Car,
  truck: Truck,
  work: HardHat,
  fall: PersonStanding,
  dog: Dog,
  medical: Stethoscope,
  other: CircleHelp,
};

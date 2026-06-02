import { IconType } from "react-icons";
import { FaHeadphones } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import { FaLaptop } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";

const categoryStringToIcon: Record<string, IconType> = {
  Headphone: FaHeadphones,
  "Smart Watch": BsSmartwatch,
  Laptop: FaLaptop,
  "electric scooter": MdElectricScooter,
};

export function getIconsByName(category: string): IconType {
  return categoryStringToIcon[category] ?? FaShoppingCart;
}

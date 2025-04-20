import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const cn = (...classname: ClassValue[]) => twMerge(clsx(classname));

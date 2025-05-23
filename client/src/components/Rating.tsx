import { Star } from "lucide-react";

type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  return [1, 2, 3, 4, 5].map((index) => (
    <Star
      key={index}
      color={index <= rating ? "#ffc107" : "#e4e5e9"}
      className="w-4 h-4"
    />
  ));
}

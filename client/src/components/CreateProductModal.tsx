import { type Product } from "@/state/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "./Header";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: Product) => void;
};

export default function CreateProductModal({
  isOpen,
  onClose,
  onCreate,
}: Props) {
  const [formData, setFormData] = useState<Product>({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const labelStyles = "block text-sm font-medium text-gray-700";
  const inputStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const set = new Set(["price", "stockQuantity", "rating"]);
    setFormData({
      ...formData,
      [e.target.name]: set.has(e.target.name)
        ? parseFloat(e.target.value)
        : e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create new product" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="name" className={labelStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputStyles}
          />

          <label htmlFor="price" className={labelStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputStyles}
          />

          <label htmlFor="stockQuantity" className={labelStyles}>
            Stock Quantity
          </label>
          <input
            type="text"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputStyles}
          />

          <label htmlFor="rating" className={labelStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputStyles}
          />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

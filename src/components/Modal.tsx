import { Product } from "../App";
import { formatCurrency } from "../helpers/currency";

type TModal = {
  isOpen: boolean;
  onClose: () => void;
  item: Product | null;
};

const Modal: React.FC<TModal> = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md w-1/2 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 ">
          X
        </button>
        {item && (
          <>
            <h1 className="text-md text-opacity-10">{item.brand}</h1>
            <h2 className="text-xl font-bold mb-4">{item.title}</h2>
            <p className="mb-4">{item.description}</p>
            <p>{formatCurrency(item.price, "PHP")}</p>
            <div className="flex gap-2">
              {item.images.slice(0, 4).map((image, i) => (
                <img
                  key={i}
                  src={image}
                  width={100}
                  className="aspect-square object-contain"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

import { Link } from "react-router-dom";
import { Products } from "../../GlobalContext";

interface ProductCardProps {
  product: Products;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <Link to={`/product/${product._id}`} className="group block reveal">
    <div className="product-image-wrap aspect-[4/5] rounded-[1.35rem]">
      <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
      {product.bestSeller && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-900 backdrop-blur">
          Bestseller
        </span>
      )}
      <span className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-stone-950 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
        View product
      </span>
    </div>
    <div className="mt-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-sm font-medium text-stone-900 sm:text-[15px]">{product.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone-400">{product.subCategory}</p>
      </div>
      <p className="shrink-0 text-sm font-semibold text-stone-900">${product.price.toFixed(2)}</p>
    </div>
  </Link>
);

export default ProductCard;

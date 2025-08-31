import { ProductGridProps } from '@/types/Product';
import ProductCard from '@/components/common/ProductCard';

const ProductGrid = ({ title, products }: ProductGridProps) => {
  return (
    <>
      <h1 className='text-[#F1F1F5] text-xl font-semibold'>{title}</h1>
      <div className='grid grid-cols-2 gap-[15px] lg:gap-[20px] lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;

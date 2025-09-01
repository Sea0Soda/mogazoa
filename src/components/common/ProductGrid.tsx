import { ProductGridProps } from '@/types/Product';
import ProductCard from '@/components/common/ProductCard';

const ProductGrid = ({ title, products }: ProductGridProps) => {
  return (
    <>
      <div className='flex items-center gap-2.5'>
        <h1 className='text-[#F1F1F5] text-xl font-semibold'>{title}</h1>
        <h1
          className='font-semibold text-xl lg:text-2xl bg-gradient-to-r from-[#5097FA] to-[#5363FF]
        bg-clip-text text-transparent '
        >
          TOP 6
        </h1>
      </div>

      <div className='grid grid-cols-2 gap-[15px] lg:gap-[20px] lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;

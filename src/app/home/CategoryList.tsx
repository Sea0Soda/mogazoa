'use client';

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

const CategoryList = ({ categories, selectedId, onSelect }: CategoryListProps) => {
  return (
    <>
      <div className='px-5 py-[15px] text-[#F1F1F5] md:text-sm lg:text-base text-center'>
        카테고리
      </div>
      {categories.map((category) => {
        const isSelected = category.id === selectedId;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(isSelected ? null : category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm lg:text-base
                ${isSelected ? 'text-[#F1F1F5] bg-[#252530]' : 'text-[#6E6E82] hover:bg-gray-700'}`}
          >
            {category.name}
          </button>
        );
      })}
    </>
  );
};

export default CategoryList;

'use client';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import CategoryList from './CategoryList';

interface MobileCategorySheetProps {
  categories: { id: number; name: string }[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

const MobileCategorySheet = ({ categories, selectedId, onSelect }: MobileCategorySheetProps) => {
  return (
    <Sheet>
      <SheetContent side='left' className='p-4'>
        <CategoryList categories={categories} selectedId={selectedId} onSelect={onSelect} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategorySheet;

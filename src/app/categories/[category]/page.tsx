import { getCompoundsByCategory } from '../../utils/pubchem';
import CompoundCard from '../../components/CompoundCard';
import { Compound } from '../../types';

// Correct props type for App Router pages
interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const compounds: Compound[] = getCompoundsByCategory(params.category);
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryName} Compounds</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {compounds.map((compound, index) => (
          <CompoundCard key={index} compound={compound} />
        ))}
      </div>
    </div>
  );
}
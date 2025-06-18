import Link from 'next/link';

const CATEGORIES = [
  { id: 'pharmaceuticals', name: 'Pharmaceuticals' },
  { id: 'organic', name: 'Organic Compounds' },
  { id: 'inorganic', name: 'Inorganic Compounds' },
  { id: 'common', name: 'Common Chemicals' },
];

export default function CategoryList() {
  return (
    <ul className="space-y-2">
      {CATEGORIES.map((category) => (
        <li key={category.id}>
          <Link 
            href={`/categories/${category.id}`}
            className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
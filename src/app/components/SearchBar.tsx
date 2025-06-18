'use client';

import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('query') as string;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        name="query"
        placeholder="Search by name or CAS..."
        className="flex-1 p-3 border rounded-lg bg-white"
        required
      />
      <button
        type="submit"
        className="bg-violet-800 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
import { searchCompounds } from "../utils/pubchem";
import CompoundCard from "../components/CompoundCard";
import { Compound } from "../types";
import SearchBar from "../components/SearchBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  const results: Compound[] = query ? await searchCompounds(query) : [];

  return (
    <div className="container mx-auto pb-8 bg-neutral-100">
      <div className="container mx-auto py-8  bg-violet-800">
        <div className="max-w-7xl mx-auto"></div>
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Common Chemistry
        </h1>

        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar />
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="font-bold mb-6">
          <span className="">Search Results for:</span> <br></br>
          <span className="text-violet-800 text-2xl ">{query}</span>
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((compound: Compound) => (
              <CompoundCard key={compound.cid} compound={compound} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">
            {query
              ? "No compounds found. Try a different search term."
              : "Enter a search term to find compounds"}
          </p>
        )}
      </div>
    </div>
  );
}

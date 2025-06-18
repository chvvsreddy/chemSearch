import CategoryList from './components/CategoryList';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <main className="container mx-auto pb-8 ">
      <div className="container mx-auto py-8  bg-violet-800">
        <div className='max-w-7xl'>

        </div>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Common Chemistry</h1>
      
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar />
      </div>

      </div>
      <div className='max-w-7xl mx-auto py-16'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
          <CategoryList />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Compounds</h2>
          {/* Add featured compounds here */}
        </section>
      </div>
      </div>
      
      
      
    </main>
  );
}
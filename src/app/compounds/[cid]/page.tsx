import { getCompoundDetails } from '../../utils/pubchem';
import ChemicalStructure from '../../components/ChemicalStructure';

export default async function CompoundPage({
  params
}: {
  params: { cid: string }
}) {
  const compound = await getCompoundDetails(params.cid);

  if (!compound) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Compound not found</h1>
        <p>Unable to retrieve details for CID: {params.cid}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{compound.name}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Properties</h2>
              <ul className="space-y-2">
                <li><strong>CID:</strong> {compound.cid}</li>
                
                {compound.molecularFormula && (
                  <li><strong>Molecular Formula:</strong> {compound.molecularFormula}</li>
                )}
                
                {compound.molecularWeight !== undefined && (
                  <li>
                    <strong>Molecular Weight:</strong> 
                    {typeof compound.molecularWeight === 'number' 
                      ? ` ${compound.molecularWeight.toFixed(2)}`
                      : ' N/A'}
                  </li>
                )}
                
                {compound.smiles && (
                  <li><strong>SMILES:</strong> {compound.smiles}</li>
                )}
                
                {compound.inchikey && (
                  <li><strong>InChIKey:</strong> {compound.inchikey}</li>
                )}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Chemical Structure</h2>
              <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                <ChemicalStructure cid={compound.cid} name={compound.name} />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">
              {compound.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
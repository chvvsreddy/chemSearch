import axios from 'axios';
import { Compound, PubChemSearchResult } from '../types';

// Search compounds by name or CAS
export const searchCompounds = async (query: string): Promise<Compound[]> => {
  try {
    const response = await axios.get<PubChemSearchResult>(
      `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${query}/json?limit=20`
    );
    
    const results: Compound[] = [];
    
    // Handle dictionary_terms format
    if (response.data.dictionary_terms?.compound) {
      response.data.dictionary_terms.compound.forEach((name, index) => {
        results.push({
          id: index,
          name,
          cid: response.data.entries?.[index]?.id || `${index}`
        });
      });
    }
    // Handle entries format
    else if (response.data.entries) {
      // Fix: Remove unused index parameter
      response.data.entries.forEach((entry) => {
        results.push({
          id: entry.id,
          name: entry.name,
          cid: entry.id
        });
      });
    }
    
    return results;
  } catch (error) {
    console.error("PubChem search error:", error);
    return [];
  }
};

// Get compound details by CID
export const getCompoundDetails = async (cid: string): Promise<Compound | null> => {
  try {
    const [propsResponse, descResponse] = await Promise.all([
      axios.get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/InChIKey,CanonicalSMILES,MolecularFormula,MolecularWeight,IUPACName/JSON`),
      axios.get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/JSON`)
    ]);
    
    // Extract properties safely
    const properties = propsResponse.data?.PropertyTable?.Properties?.[0] || {};
    const descriptions = descResponse.data?.InformationList?.Information || [];
    
    // Parse molecular weight as number
    let molecularWeight: number | undefined;
    const mwValue = properties.MolecularWeight;
    if (typeof mwValue === 'number') {
      molecularWeight = mwValue;
    } else if (typeof mwValue === 'string') {
      molecularWeight = parseFloat(mwValue);
    }

    return {
      cid,
      id: cid,
      name: properties.IUPACName || `Compound ${cid}`,
      molecularFormula: properties.MolecularFormula || '',
      molecularWeight,
      smiles: properties.CanonicalSMILES || '',
      inchikey: properties.InChIKey || '',
      description: descriptions[0]?.Description || 'No description available.'
    };
  } catch (error) {
    console.error("PubChem details error:", error);
    return null;
  }
};

// Get compounds by category
export const getCompoundsByCategory = (category: string): Compound[] => {
  // Predefined compounds for each category
  const categories: Record<string, Compound[]> = {
    pharmaceuticals: [
      { id: "2244", name: "Aspirin", cid: "2244" },
      { id: "1983", name: "Paracetamol", cid: "1983" },
      { id: "3672", name: "Ibuprofen", cid: "3672" }
    ],
    organic: [
      { id: "241", name: "Benzene", cid: "241" },
      { id: "702", name: "Ethanol", cid: "702" },
      { id: "297", name: "Methane", cid: "297" }
    ],
    inorganic: [
      { id: "5234", name: "Sodium Chloride", cid: "5234" },
      { id: "962", name: "Water", cid: "962" },
      { id: "10112", name: "Calcium Carbonate", cid: "10112" }
    ],
    common: [
      { id: "2519", name: "Caffeine", cid: "2519" },
      { id: "5988", name: "Sucrose", cid: "5988" },
      { id: "54670067", name: "Vitamin C", cid: "54670067" }
    ]
  };
  
  return categories[category] || [];
};
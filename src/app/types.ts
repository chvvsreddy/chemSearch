
export type Compound = {
  id: string | number;
  name: string;
  cid: string;
  casNumber?: string;
  molecularFormula?: string;
  molecularWeight?: number;
  smiles?: string;
  inchikey?: string;
  description?: string;
};

export type PubChemSearchResult = {
  dictionary_terms?: {
    compound?: string[];
  };
  entries?: Array<{
    id: string;
    name: string;
  }>;
};
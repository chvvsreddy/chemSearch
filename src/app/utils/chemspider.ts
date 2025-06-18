import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_CHEMSPIDER_URL;
const API_KEY = process.env.CHEMSPIDER_API_KEY;

export const searchCompounds = async (query: string) => {
  const response = await axios.post(
    `${API_URL}/filter`,
    {
      name: query,
      orderBy: 'relevance',
      orderDirection: 'desc'
    },
    {
      headers: {
        'apikey': API_KEY,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};

export const getCompoundDetails = async (id: number) => {
  const response = await axios.get(
    `${API_URL}/compounds/${id}/details`,
    {
      headers: { 'apikey': API_KEY }
    }
  );
  return response.data;
};

export const getCompoundsByCategory = async (category: string) => {
  // Map categories to specific queries
  const categoryQueries: Record<string, string> = {
    'pharmaceuticals': 'pharmaceutical',
    'organic': 'organic',
    'inorganic': 'inorganic',
    'common': 'common'
  };
  
  const query = categoryQueries[category] || '';
  return searchCompounds(query);
};
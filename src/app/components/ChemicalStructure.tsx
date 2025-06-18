'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ChemicalStructure({ cid, name }: { cid: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="text-gray-500 text-center p-4">
        Structure not available
      </div>
    );
  }

  return (
    <Image 
      src={`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=l`} 
      alt={`Structure of ${name}`}
      className="max-h-full max-w-full p-4"
      onError={() => setError(true)} width={200} height={200}
    />
  );
}
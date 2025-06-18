import Link from 'next/link';
import { Compound } from '../types';

export default function CompoundCard({ compound }: { compound: Compound }) {
  return (
    <Link href={`/compounds/${compound.cid}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow border-neutral-200 bg-white">
        <h3 className="font-bold text-md mb-2">{compound.name}</h3>
        <p className="text-gray-600">
          <span className="font-semibold">CID:</span> {compound.cid}
        </p>
      </div>
    </Link>
  );
}
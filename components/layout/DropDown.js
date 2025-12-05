import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

export default function DropDown({ content }) {
    return (
        <div className="relative group">
            <button className="flex items-center gap-1 text-black font-medium text-base focus:outline-hidden group-focus-within:text-primary  transition-colors">
                {content.title} <FaChevronDown className="ml-1 text-xs" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-sm shadow-lg opacity-0  group-hover:opacity-100  group-hover:visible  invisible transition-all z-20">
                {content.pages.map((p, i) => (
                    <Link key={i} href={p.link} className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">{p.name}</Link>
                ))}
            </div>
        </div>
    )
}

import { FaChevronDown, FaHome } from 'react-icons/fa';

export default function SelectField({ name, placeholder, handle, options = [] }) {

    return (
        <div className="relative">
            <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select name={name}  required onChange={handle} className={`rounded-sm border pl-10 pr-8 py-2 w-full appearance-none invalid:text-gray-400`}>
                <option value={''} hidden >{placeholder}</option>
                {options.map((option) => (
                    <option key={option.code} value={option.code}>{`${option.name[0] + option.name.slice(1).toLowerCase()}`}</option>
                ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
    )

}

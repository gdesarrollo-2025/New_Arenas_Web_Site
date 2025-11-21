import FilterContent from "./FilterContent"

export default function FilterSideBarMobile({ ToogleFilterMobile }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-end">
            <div className="bg-white w-80 h-full overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Filtros</h2>
                    <button
                        onClick={ToogleFilterMobile}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <FaTimes />
                    </button>
                </div>
                <FilterContent />
            </div>
        </div>
    )
}
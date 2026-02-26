import { useState, useMemo } from "react"
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa6"

import ProjectCard from "./ProjectCard"

const buttons = [
    { label: "Nombre", type: "name" },
    { label: "Precio", type: "precio" },
    { label: "Área", type: "area" }
]

export default function SearchProjectsSection({formRef, Projects}) {

    const projects = Projects.filter(p => p.status != "Vendido")
    const [filters, setFilters] = useState({
        citiesSelected: [],
        statusSelected: "",
        smmlv: null,
    })

    const [sort, setSort] = useState({
        dir: "",
        typeSort: "",
    })

    const applyfilters = (p) => {
        const { citiesSelected, statusSelected, smmlv } = filters;

        const cityFilter =
            citiesSelected.length === 0 ||
            citiesSelected.includes(p.city);

        const statusFilter =
            statusSelected === "" ||
            p.status === statusSelected;

        const smmlvFilter =
            smmlv === null ||
            p.smmlv === smmlv;

        return cityFilter && statusFilter && smmlvFilter;
    };

    function createComparator(key, dir) {
        if (!key || !dir) return null;

        const factor = dir === "ASC" ? 1 : -1;

        return (a, b) => {
            const A = a[key];
            const B = b[key];

            if (A == null) return 1;
            if (B == null) return -1;

            if (typeof A === "number" && typeof B === "number") {
                return (A - B) * factor;
            }

            return String(A).localeCompare(String(B)) * factor;
        };
    }

    const filteredProjects = useMemo(() => {
        let result = projects.filter(applyfilters);

        const comparator = createComparator(sort.typeSort, sort.dir);
        if (comparator) result = [...result].sort(comparator);

        return result;
    }, [projects, filters, sort]);

    const handleCityChange = (e) => {
        const { value, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            citiesSelected: checked
                ? [...prev.citiesSelected, value]
                : prev.citiesSelected.filter((c) => c !== value)
        }));
    }

    const clearFilters = () => {
        setFilters({
            citiesSelected: [],
            statusSelected: "",
            smmlv: null,
        })
        setSort({
            dir: "",
            typeSort: "",
        })
    }

    const ResultsMessage = () => {
        let message
        if (!filteredProjects.length) {
            message = "Lo sentimos no encontramos resultados para tu busqueda"
        } else {
            message = `Mostrando ${filteredProjects.length} resultados`
            if (filters.citiesSelected.length != 0 || filters.statusSelected || typeof filters.smmlv != null) {
                message += " en " + filters.citiesSelected.join(', ')
            }
        }
        return <p className="text-xl font-semibold text-primary *:">{message}</p>
    }

    return <section ref={formRef} className="container-custom flex flex-col items-center gap-4 py-5 snap-start" >
        <h2 className="text-2xl md:text-4xl text-primary "> Proyectos inmobiliarios</h2>
        <hr className="border-2 border-primary w-full md:w-1/2" />
        <p> Conoce nuestra oferta de inmuebles</p>
        <div className="w-full flex flex-col lg:flex-row  gap-3 items-center border-2 border-secondary rounded-[10px] p-3 ">
            <div className="flex lg:flex-col gap-3 justify-around items-stretch w-full lg:w-fit ">
                {["Barranquilla", "Soledad", "Cartagena"].map((city) => (
                    <label key={city} className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            value={city}
                            checked={filters.citiesSelected.includes(city)}
                            className="appearance-none w-4 h-4  border-2 border-primary rounded-sm bg-white checked:bg-primary  checked:border-0"
                            onChange={handleCityChange}
                        />
                        {city}
                    </label>
                ))}
            </div>
            <div className="justify-around w-full ">
                <select
                    value={filters.statusSelected}
                    className="rounded-sm w-full border-2 border-gray-400/60 px-2 focus-within:border-primary"
                    onChange={(e) =>
                        setFilters(prev => ({
                            ...prev,
                            statusSelected: e.target.value
                        }))
                    }

                >
                    <option value="" disabled >Estado</option>
                    <option value="Lanzamiento">Lanzamiento</option>
                    <option value="Ultimas Unidades">Ultimas unidades</option>
                </select>
            </div>
            <div className=" flex lg:flex-col items-stretch justify-around w-full gap-2 ">
                <label className="flex items-center gap-1"><input type="radio" name="price" onChange={(e) => setFilters(prev => ({ ...prev, smmlv: 1 }))} className="w-4 h-4" /> Salario minimo mensual</label>
                <label className="flex items-center gap-1"><input type="radio" name="price" onChange={(e) => setFilters(prev => ({ ...prev, smmlv: 0 }))} className="w-4 h-4" /> Pesos Colombianos</label>
            </div>
            <div className="flex justify-around gap-2">
                {buttons.map(({ label, type }) => (
                    <div key={type} className=" flex flex-col md:flex-row lg:flex-col items-center gap-2 ">
                        <button type="button" onClick={() => setSort({ dir: "ASC", typeSort: type })}
                            className=" flex items-center gap-1 w-20 px-1 py-0.5 border-2 border-primary  text-sm rounded-sm text-primary active:bg-primary active:text-white ">
                            <FaArrowUp /> {label}
                        </button>
                        <button type="button" onClick={() => setSort({ dir: "DESC", typeSort: type })}
                            className=" flex items-center gap-1 w-20 px-1 py-0.5 border-2 border-primary  text-sm rounded-sm text-primary active:bg-primary active:text-white ">
                            <FaArrowDown /> {label}
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={clearFilters}
                className="self-center flex items-center gap-2 w-fit px-2 py-1 border-2 border-gray-500 rounded-sm text-gray-500 active:brightness-125"> <FaTrash /> Limpiar filtros</button>
        </div>
        <ResultsMessage />
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full place-items-center">
            {filteredProjects.map((p, idx) => (
                <ProjectCard key={idx} project={p} />
            ))
            }
        </div>
    </section>
}
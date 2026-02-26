import Link from "next/link";

export default function InfoSection({ Infocard }) {
    let color;

    if(Infocard.name[0] === "Para propietarios"){
        color= "#802a90"
    }else if (Infocard.name[0] === "Para arrendatarios"){
        color= "#6a2078"
    }else if (Infocard.name[0] === "Para vendedores"){
        color= "#2a6d90"
    }else{
        color= "#7ab547"
    }
    
    return <div className="flex flex-col gap-2 py-15 sm:py-10">
        <h2 className="text-primary flex flex-col sm:flex-row">{Infocard.name[0]}<span className="text-primary/75 text-lg font-normal pl-0 sm:pl-5 self-start sm:self-end">{Infocard.name[1]}</span></h2>
        <p className="text-left text-pretty">{Infocard.description}</p>
        <div className="my-3 flex flex-col items-center sm:items-stretch sm:grid sm:grid-cols-2 sm:justify-items-center lg:grid-cols-4 gap-4" >
            {Infocard.cards.map((card, idx) => {
                return <div key={idx} className="overflow-hidden w-2/3 lg:w-full flex flex-col shadow-lg rounded-[10px] hover:-translate-y-3 transition-all group">
                    <h3 className={` bg-radial-[at_20%_90%] from-transparent via-[${color}] to-transparent content-center text-center text-balance min-h-15 text-[${color}]  font-semibold transition-all`}>{card.title}</h3>
                    <ul className="px-3 py-2 list-inside list-disc grow">
                        {card.items.map((item, idx) => (
                            <li key={idx}className="text-sm">{item}</li>
                        ))}
                    </ul>
                </div>
            })}

        </div>
        <Link href={Infocard.link.href} className="w-fit px-2 py-1 rounded-[10px] bg-lime-800 text-white hover:bg-lime-500 active:bg-lime-500/50 transition-all">{Infocard.link.text}</Link>
    </div>
}
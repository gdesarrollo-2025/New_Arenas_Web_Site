import {Gemunu_Libre} from "next/font/google"
import { useEffect, useState } from 'react';

const gemunu = Gemunu_Libre({
  subsets: ["latin"],
  weight: ["400"], // ajusta según lo que uses
  display: "swap", 
});


const Counter = ({ target, duration}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < target) {
            if(target>1000){
                return prevCount+50;
            }
          return prevCount + 1;
        }
        clearInterval(interval);  
        return target;
      });
    }, duration); // La animación ocurre cada 50ms, puedes ajustar este valor

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [target]);

  return (
    <div className={`${gemunu.className} text-5xl md:text-6xl`}>
      <span className="transition-all duration-300 ease in out">{count}</span>
    </div>
  );
};

export default Counter;

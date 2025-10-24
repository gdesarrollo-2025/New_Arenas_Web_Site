import { useEffect, useState } from 'react';

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
    <div className="font-gemunu text-5xl md:text-6xl">
      <span className="transition-all duration-0.3 ease in out">{count}</span>
    </div>
  );
};

export default Counter;

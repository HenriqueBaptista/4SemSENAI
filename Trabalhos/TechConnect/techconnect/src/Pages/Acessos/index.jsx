import React, { useEffect, useState } from 'react';

const Acessos = () => {
  const [acessos, setAcessos] = useState([]);

  useEffect(() => {
    const fetchAcessos = async () => {
      const response = await fetch('http://localhost:3000/acessos');
      const data = await response.json();
      setAcessos(data);
    };

    fetchAcessos();
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <h1 className="font-poppins font-bold text-xl text-white mt-8">Últimos Acessos</h1>
      
      <div className="flex justify-between mt-6 w-full max-w-4xl">
        {acessos.map((acesso, index) => (
          <div key={index} className="relative w-[360px] border border-white border-opacity-25">
            <div className="absolute w-full h-0 border-b border-white border-opacity-25"></div>
            <div className="absolute flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-cover rounded-full mt-4" />
                <span className="font-poppins font-bold text-base text-white mt-2">{acesso.usuario}</span>
                <span className="font-poppins font-normal text-xs text-white">{new Date(acesso.data).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acessos;

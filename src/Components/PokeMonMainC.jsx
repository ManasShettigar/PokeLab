import React, { useEffect, useState } from "react";
import "../Styles/PokeMonMainC.css";
import PokemonInfo from "./PokemonInfo";

function PokeMonMainC(props) {
  const [pokemonData, setpokemonData] = useState(null);
  const [nextPage, setnextPage] = useState(6);
  const [prevPage, setprevPage] = useState(0);
  const [prevPageState, setprevPageState] = useState(true);
  const [prevPageStateStyle, setprevPageStateStyle] = useState('prevPageStateStyle');

  const link = `https://pokeapi.co/api/v2/pokemon?offset=${prevPage}&limit=${nextPage}`;
  const fetchPokemon = async () => {
    const response = await fetch(link);
    const data = await response.json();
    setpokemonData(data.results);
    console.log(data.results);
  };
  useEffect(() => {fetchPokemon();}, [nextPage, prevPage]);
  window.onload = function () {
    // fetchPokemon();
  };
 
  const handleDecrement=()=>{
    if(prevPage!=0){
        console.log(prevPage)
        const value1=prevPage-6;
        // const value2=nextPage-6;
        // setnextPage(value2);
        setprevPage(value1);
        console.log(value1);
        if(value1<=0){
            setprevPageStateStyle('prevPageStateStyle')
            setprevPageState(true)   
        }   
    }
  }
  const handleIncrement=()=>{
    console.log('click')
    // const value1=nextPage+6;
    // setnextPage(value1);
    const value2=prevPage+6;
    setprevPage(value2);
    // console.log(value1)
    console.log(value2)
    if(value2>=6){
        setprevPageState(false)   
        setprevPageStateStyle('');
    }
  }
  return (
    <div className="PokeMonMainC h-5/6 w-5/6 bg-white mt-3 flex justify-evenly items-center flex-col">
      <div className="pokemonDisplayC h-5/6 w-full">
        <div className="pokemon-grid h-full w-full px-4">
          {pokemonData
            ? pokemonData.map((data) => (
                <PokemonInfo key={data.id} pokeInfo={data} pokeHandle={props.pokedexHandle} />
              ))
            : ""}
        </div>
      </div>
      <div className="pokeButtons w-full flex justify-evenly items-center">
        <button className={`Prev flex justify-evenly items-center ${prevPageStateStyle}`} disabled={prevPageState} onClick={handleDecrement} > 
          <span>Previous</span>
        </button>
        <button className="Next flex justify-evenly items-center" onClick={handleIncrement}>
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}

export default PokeMonMainC;

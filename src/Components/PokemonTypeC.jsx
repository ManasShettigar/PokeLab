import React, { useEffect, useState } from 'react'
import '../Styles/PokemonTypeC.css'
import PokemonInfo from './PokemonInfo';
import { useLocation } from 'react-router-dom';

function PokemonTypeC(props) {
    const location = useLocation();
  const data = location.state;
    console.log(data);
    const link=`${data?data.value:'https://pokeapi.co/api/v2/type/13/'}`
    const [pokemonData, setpokemonData] = useState(null);
    const [pokemonType, setpokemonType] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  const [elementsToShow, setElementsToShow] = useState(6);

  const handleShowMore = () => {
    setElementsToShow(elementsToShow + 6);
  };

    const fetchPokemon = async () => {
        const response = await fetch(link);
        const data = await response.json();
        setpokemonData(data.pokemon);
        setpokemonType(data.name)
        console.log(data.pokemon);
        console.log(data.name);
      };
      useEffect(() => {fetchPokemon();}, [link]);
  return (
    <>
    <div className='PokemonTypeC h-5/6 w-5/6 mt-3 p-4 bg-white flex justify-center items-center flex-col gap-4'>
    <div className="pokemonDisplayC w-full overflow-y-scroll">
        <div className="pokemon-grid h-full w-full px-2">
          {pokemonData
            ? pokemonData.slice(currentIndex, currentIndex + elementsToShow).map((data) => (
                <PokemonInfo  pokeInfo={data.pokemon} pokeHandle={props.pokedexHandle} />
                
              ))
            : ""}
        </div>
      </div>
      <div className="LowerC w-full  flex justify-between items-center px-4">

<div className="TypeP">Type: {pokemonType?pokemonType.toUpperCase():''}</div>
      <button onClick={handleShowMore}>Load More..</button>
      </div>
      
      {/* <div className="pokeButtons w-full flex justify-evenly items-center">
        <button className={`Prev flex justify-evenly items-center ${prevPageStateStyle}`} disabled={prevPageState} onClick={handleDecrement} > 
          <span>Previous</span>
        </button>
        <button className="Next flex justify-evenly items-center" onClick={handleIncrement}>
          <span>Next</span>
        </button>
      </div> */}
    
    </div>
    </>
  )
}

export default PokemonTypeC
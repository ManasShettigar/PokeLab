import React, { useEffect, useState } from 'react'

import "../Styles/Pokeinfo.css"
function PokemonInfo(props) {
    
    const [pokeData, setpokeData] = useState('')
  const link=`https://pokeapi.co/api/v2/pokemon/${props.pokeInfo.name}`
  const fetchPokemon= async()=>{
const response= await fetch(link);
const data= await response.json();
console.log(data);
// console.log(data.sprites.front_default);

setpokeData(data)
  }
  useEffect(() => {
    fetchPokemon();
  }, [props.pokeInfo.name])
  
  const handleOpen=()=>{
    props.pokeHandle(pokeData.name)
  }
    // window.onload(function(){
        
    // })
  return (
    <>
    <div className='PokeContainer flex justify-evenly items-center ' onClick={handleOpen} >
        <img src={pokeData?pokeData.sprites.other.dream_world.front_default?pokeData.sprites.other.dream_world.front_default:pokeData.sprites.front_default:''} id='pokeImage' alt="" className="PokeImage" />
        <div className="PokeInfo h-full w-3/6 py-5 flex justify-between items-center flex-col"> 
            <div className="pokeName" ><h1 id='pokeTitle'>{props.pokeInfo.name.toUpperCase()}</h1>
            </div>
            <div className="ATitle"><h1 className='text-lg text-blue-300'>Abilities:</h1></div>
                <div className="abilities ">
                    {pokeData?pokeData.abilities.map((value,key)=>( <div className='abilitiesCard flex justify-center items-center' key={key} ><span>{value.ability.name.toUpperCase().replace('-',' ')}</span> </div>)):''}
                </div>
            </div></div>
    </>
  )
}

export default PokemonInfo
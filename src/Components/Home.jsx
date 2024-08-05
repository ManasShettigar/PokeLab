import React, { useEffect, useState } from "react";
import pokemonLogo from "../Media/pokemonLogo.png";
import "../Styles/Home.css";
import spotlightBG from "../Media/spotlight-shining-down-into-grunge-interior (1).jpg";
import pokeballImg from "../Media/pokeball.png";
import PokeMonMainC from "./PokeMonMainC";
import PokeSearch from "./PokeSearch";
import PokemonTypeC from "./PokemonTypeC";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Home(props) {
    const [bgBlur, setbgBlur] = useState('')
    const [pokeSearchSelected, setpokeSearchSelected] = useState('')
    const [pokeDexDropDown, setpokeDexDropDown] = useState('')
    const [pokemonSet, setpokemonSet] = useState(null)
    const [HeropokemonSet, setHeropokemonSet] = useState('pikachu')
    const notify = () =>
      toast('Entered Pokemon does not exist!', {
        type: 'error',
        autoClose: 3000,
      });
    const fetchPokemonImage=async ()=>{
        const value = Math.floor(Math.random() * 1001);           
        const link= `https://pokeapi.co/api/v2/pokemon/${value}/`
        const response=await fetch(link); 
        const data=await response.json();
        setHeropokemonSet(data.name?data.name:'pikachu')
        console.log(data)
        setimageLink(data.sprites.other.dream_world.front_default?data.sprites.other.dream_world.front_default:data.sprites.other.home.front_default?data.sprites.other.home.front_default:data.sprites.front_default?data.sprites.front_default:imgHero); 
    }
    useEffect(() => {
        const intervalId = setInterval(fetchPokemonImage, 6000);
        return () => clearInterval(intervalId); 
      }, [fetchPokemonImage]);
    

  const imgHero =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg";
  
      const handlePokeDexOpenWithPokemon=(pokemonName)=>{
        if(bgBlur=='bgBlur'){
            setbgBlur('');
            setpokeSearchSelected('')
            setpokeDexDropDown('')    
            setpokemonSet('')
        }
        else{
            setbgBlur('bgBlur');
            setpokeSearchSelected('pokeSearchSelected')
            setpokeDexDropDown('pokeDexDropDown')
            setpokemonSet(pokemonName)
            console.log(pokemonName)
        }
      }

   const HandlePokeDexOpen=()=>{
    if(bgBlur=='bgBlur'){
        setbgBlur('');
        setpokeSearchSelected('')
        setpokeDexDropDown('')    
        setpokemonSet('')
    }
    else{
        setbgBlur('bgBlur');
        setpokeSearchSelected('pokeSearchSelected')
        setpokeDexDropDown('pokeDexDropDown')
    }
    
} 
const changePokemon=()=>{
setpokemonSet(null)
}
const handleHeroPokeDex=()=>{
    handlePokeDexOpenWithPokemon(HeropokemonSet)
}
const navigate = useNavigate();

const handleTypeClick = () => {
    navigate('/');
    // HandlePokeDexOpen();
};
// const HandlePokeDexClose=()=>{
//     setbgBlur('');
//     setpokeSearchSelected('')
//     setpokeDexDropDown('')
//    }
  const [imageLink, setimageLink] = useState('')
    return (
    <>
    <ToastContainer />
      <div className={`MainC relative h-screen w-full`}>
        <div className="Logo">
          <img src={pokemonLogo} onClick={handleTypeClick}alt="PokeLab Logo" />
        </div>
        <div className={`HeroPokemonC h-4/6 flex justify-center items-center relative`}>
          <div className="SpotlightBG h-full">
            <img src={spotlightBG} alt="" />
          </div>
          <div className="HeroPokemonM ">
            <img src={imageLink?imageLink:imgHero} onClick={handleHeroPokeDex} alt="Image Hero" />
          </div>
        </div>
        <div className={`CenterContaniner h-5/6 w-full flex justify-center `}>
            {props.value?<PokeMonMainC pokedexHandle={handlePokeDexOpenWithPokemon}/>:<PokemonTypeC pokedexHandle={handlePokeDexOpenWithPokemon}/>}
        </div>
        <div className={`PokeSearch`} onClick={HandlePokeDexOpen}>
            <img src={pokeballImg} alt="" />
            <div className={`circle circlenew ${pokeSearchSelected}`}></div>
        </div>
        <div className={`PokesearchContainer h-4/6 w-4/6 z-20 ${pokeDexDropDown}`}><PokeSearch pokemon={pokemonSet} handleClose={HandlePokeDexOpen} changePokemon={changePokemon} notify={notify}/> 

        </div>
        <div className={`PokeSearchOuter w-screen h-screen ${bgBlur}` } onClick={HandlePokeDexOpen}>
        </div>
        
      </div>
    </>
  );
}

export default Home;

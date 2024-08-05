import React, { useEffect, useState } from 'react';
import '../Styles/PokeSearch.css';
import pikachu from '../Media/pikachucute.webp';
import searchLogo from '../Media/search-500.png';
import closeLogo from '../Media/close120.png';
import { useNavigate } from 'react-router-dom';

function PokeSearch(props) {
    const [searchedPokemon, setSearchedPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState(null);
    const [bgColor, setBgColor] = useState('');
    const [hitSearch, setHitSearch] = useState(false);
    
    const navigate = useNavigate();
    
    const link = `https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`;
    const white = 'white';
    
    const colorArray = [
        "#A8A77A", "#EE8130", "#6390F0", "#F7D02C", "#7AC74C",
        "#96D9D6", "#C22E28", "#A33EA1", "#E2BF65", "#A98FF3",
        "#F95587", "#A6B91A", "#B6A136", "#735797", "#6F35FC",
        "#705746", "#B7B7CE", "#D685AD"
    ];

    const pokemonTypes = {
        normal: '#A8A77A', fire: '#EE8130', water: '#6390F0',
        electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6',
        fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65',
        flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
        rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC',
        dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD'
    };

    const pokemonTypesLight = {
        normal: '#ffd7b5', fire: '#ffc499', water: '#87e2ff',
        electric: '#ffe26d', grass: '#c6ffc2', ice: '#c9f7f5',
        fighting: '#ffc9c5', poison: '#e4c5ff', ground: '#f5f2c6',
        flying: '#c7d2ff', psychic: '#ffc5ff', bug: '#c6ffc7',
        rock: '#f5f5c6', ghost: '#c5c3ff', dragon: '#b3c7ff',
        dark: '#c9c4c6', steel: '#e5e5ff', fairy: '#f2c5ff'
    };

    const fetchPokemon = async () => {
        try {
            const response = await fetch(link);
            const data = await response.json();
            setPokemonData(data);
            setBgColor(data.types[0].type.name);
            setHitSearch(false);
        } catch (error) {
            props.notify();
            console.error('Error fetching Pokémon data:', error);
        }
    };

    useEffect(() => {
        if (props.pokemon && props.pokemon !== '') {
            setSearchedPokemon(props.pokemon.toUpperCase());
            setHitSearch(true);
            props.changePokemon();
        }
    }, [props.pokemon]);
    
    useEffect(() => {
        if (hitSearch) {
            fetchPokemon();
        }
    }, [hitSearch]);

    const handleInput = (event) => {
        setSearchedPokemon(event.target.value);
    };

    const handleSearch = async () => {
        await fetchPokemon();
    };

    const handleClear = () => {
        setSearchedPokemon('');
        setPokemonData(null);
    };

    const handleCloseandClear = () => {
        handleClear();
        props.handleClose();
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleTypeClickV = () => {
        navigate('/Type', { state: { value: pokemonData.types[0].type.url } });
        handleCloseandClear();
    };

    return (
        <>
            <div className="MainPokeC h-full w-full flex justify-evenly items-center flex-col">
                <div className="SearchC w-full h-full flex justify-evenly items-center">
                    <div className="InputField relative">
                        <input
                            type="text"
                            className='px-3'
                            onChange={handleInput}
                            onKeyUp={handleEnter}
                            placeholder='Search For Your Pokemon'
                            value={searchedPokemon}
                        />
                        <img
                            src={closeLogo}
                            alt="close"
                            onClick={handleClear}
                        />
                    </div>
                    <button className="SearchBtn" onClick={handleSearch}>Search</button>
                </div>
                <div className="PokeMonC">
                    {pokemonData ? (
                        <div
                            className="PokeInfoC h-full w-full flex justify-center items-center "
                            style={{ backgroundColor: pokemonTypesLight[bgColor] || white }}
                        >
                            <div className="image h-full flex justify-center items-center lg:w-2/6 md:w-2/4 sm:1/4 ">
                                <img
                                    src={
                                        pokemonData.sprites.other.dream_world.front_default
                                            ? pokemonData.sprites.other.dream_world.front_default
                                            : pokemonData.sprites.other.home.front_default
                                            ? pokemonData.sprites.other.home.front_default
                                            : pokemonData.sprites.front_default
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="rightC h-full lg:w-4/6 md:w-2/4 sm:1/4">
                                <div className="pokeTitle flex justify-center items-center">
                                    <h1>{pokemonData.name.toUpperCase()}</h1>
                                </div>
                                <div className="type flex justify-start items-center gap-2 ">
                                    <span className='typeinner '>TYPE: </span>
                                    <div
                                        className='innerType flex justify-center items-center'
                                        onClick={handleTypeClickV}
                                        style={{ backgroundColor: pokemonTypes[bgColor] || white }}
                                    >
                                        <span className='h-fit'>
                                            {pokemonData.types[0].type.name.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="Stats lg:w-full  ">
                                    <div className="StisiticsC">STASTICS:</div>
                                    <div className="StatsConatiner h-full w-full ">

                                    <div className="StatsC w-full h-full">
                                        {pokemonData.stats.map((value, key) => (
                                            <div className="statsM w-full flex justify-start items-center" key={key}>
                                                <div className="statsValueH">
                                                    {value.stat.name.toUpperCase().replace('-', ' ')}:
                                                </div>
                                                <div className="statsValueM h-5">
                                                    <div className="outerBar h-full lg:w-5/6 md:w-2/4 sm:1/4 ">
                                                        <div
                                                            className="innerBar h-full flex justify-center items-center"
                                                            style={{
                                                                width: `${Math.min((value.base_stat / 100) * 100, 120)}%`,
                                                                color: pokemonTypesLight[bgColor] || white
                                                            }}
                                                        >
                                                            <span>{value.base_stat}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    </div>
                                </div>
                                <div className="abilitiesMainC flex justify-start items-center">
                                    <div className="AbilitiesT">ABILITIES:</div>
                                    <div className="AbilitiesC w-2/3 flex justify-start items-center gap-4">
                                        {pokemonData.abilities.map((value, index) => (
                                            <div
                                                className="AbyConat flex justify-center items-center min-w-fit min-h-fit"
                                                style={{ backgroundColor: colorArray[(pokemonData.id + index) % 17] }}
                                                key={index}
                                            >
                                                <span>{value.ability.name.replace('-', ' ').toUpperCase()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="weightC flex justify-start items-start">
                                    <div className="weightCardT">WEIGHT:</div>
                                    <div className="weightValue">{pokemonData.weight} POUNDS</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="SearchforPokemon h-full w-full flex justify-between items-center">
                            <img src={pikachu} alt="Pikachu Image" className="pikachuImage w-3/6" />
                            <div className="NoSearch flex justify-between items-center flex-col w-3/6">
                                <img src={searchLogo} alt="" className="SearchLogo" />
                                <div className="NPharase">
                                    <span>Search For Your Favourite Pokemon!</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <button className="CloseB text-white" onClick={handleCloseandClear}>Close</button>
            </div>
        </>
    );
}

export default PokeSearch;

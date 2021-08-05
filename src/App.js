import "./styles.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";
// https://pokeapi.co/api/v2/pokemon?limit=150

const getAllPokemons = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    .then((data) => data.json())
    .then()
    .catch((err) => console.error(err));
};

const getPokemonDescription = async (id) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return pokemon.flavor_text_entries[0].flavor_text;
};

const getPokemonImage = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedState, setSelectedState] = useState(1);
  const [name, setName] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");

  const handleSelectState = (e) => {
    const value = e.target.value;
    const [idx, name] = value.split(" ");
    setSelectedState(Number(idx));
    setName(name);
  };
  const nextPokemon = () => {
    setSelectedState((prev) => prev + 1);
    let idx = selectedState;
    setName(pokemons[idx + 1].name);
  };
  const prevPokemon = () => {
    setSelectedState((prev) => prev - 1);
    let idx = selectedState;
    setName(pokemons[idx - 1].name);
  };
  useEffect(() => {
    console.log("In here");
    if (!pokemons.length) {
      getAllPokemons().then((data) => {
        setPokemons(data.results);
        setName(data.results[0].name);
      });
    }
    getPokemonDescription(selectedState).then((data) => {
      setCurrentDescription(data);
    });
    setCurrentImage(getPokemonImage(selectedState));
  }, [selectedState, pokemons.length]);
  return (
    <div className="App">
      <select
        name="pokemons"
        id="pokemons"
        value={selectedState + " " + name}
        onChange={(e) => handleSelectState(e)}
        className="App-select"
      >
        {pokemons.map((el, idx) => (
          <option key={idx} value={`${idx + 1} ${el.name}`}>
            {el.name[0].toUpperCase() + el.name.slice(1, el.length)}
          </option>
        ))}
      </select>
      <Card
        state={selectedState}
        description={currentDescription}
        currentImage={currentImage}
        name={name}
      />
      <button
        onClick={prevPokemon}
        disabled={selectedState === 1 ? true : false}
        className="App-button"
      >
        Previous
      </button>
      <button
        onClick={nextPokemon}
        disabled={selectedState === 150 ? true : false}
        className="App-button"
      >
        Next
      </button>
    </div>
  );
}

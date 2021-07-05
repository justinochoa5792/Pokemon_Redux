import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetPokemonList } from "../actions/PokemonActions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

const PokemonList = (props) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  useEffect(() => {
    FetchData(1);
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const showData = () => {
    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className={"list-wrapper"}>
          {pokemonList.data.map((el) => {
            return (
              <div className={"pokemon-item"}>
                <p>{el.name}</p>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            );
          })}
        </div>
      );
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  };

  return (
    <div>
      <div className="search-wrapper">
        <p>Search: </p>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button onClick={() => props.history.push(`/pokemon/${search}`)}>
          Search
        </button>
      </div>
      {showData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"pagination"}
        />
      )}
    </div>
  );
};

export default PokemonList;

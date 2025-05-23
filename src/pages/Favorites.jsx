import React from "react";
import Card from "../components/Card";
import AppContext from "../contex";

function Favorites({onAddToFavorites}) {
  const {favorites} = React.useContext(AppContext)


  return(
    <div className="content p-40">

    <div className="d-flex align-center justify-between mb-40">
      <h1>Мои закладки</h1>

    </div>

    <div className="d-flex flex-wrap">
      {favorites.map((item, index) => (
          <Card 
            key={index}
            //{...item} - передает все свойства объекта, чтобы не писать отдельно
            {...item}
            favorited ={true}
            onFavorite={onAddToFavorites}
          />
        ))} 
    </div>

  </div>
  );
}

export default Favorites;
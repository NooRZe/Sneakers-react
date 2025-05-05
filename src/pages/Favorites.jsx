import Card from "../components/Card";

function Favorites({items, onAddToFavorites}) {
  return(
    <div className="content p-40">

    <div className="d-flex align-center justify-between mb-40">
      <h1>Мои закладки</h1>

    </div>

    <div className="d-flex flex-wrap">
      {items.map((item, index) => (
          <Card 
            key={index}
            //{...item} - передает все свойства объекта, чтобы не писать отдельно
            id = {item.id}
            title= {item.title}
            price= {item.price}
            imageUrl={item.imageUrl}
            favorited ={true}
            onFavorite={onAddToFavorites}
          />
        ))} 
    </div>

  </div>
  );
}

export default Favorites;
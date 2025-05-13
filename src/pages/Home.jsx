import Card from "../components/Card";

function Home({
  cartItems,
  items, 
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToFavorites, 
  onAddToCart, 
  isLoading
}) {
  
  const renderItems = () => {
    const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
        <Card 
          key = {index}
          onPlus = {(obj) => onAddToCart(obj)}
          onFavorite = {(obj) => onAddToFavorites(obj)}
          added = {cartItems.some(obj => Number(obj.id) === Number(item.id))}
          loading = {isLoading}
          {...item}
        />   
      ));
  }

  return(
    <div className="content p-40">

    <div className="d-flex align-center justify-between mb-40">
      <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
      <div className="searchBlock d-flex">
        <img src="img/search.svg" alt="Search"/>
        {searchValue && <img onClick={() => setSearchValue('')} src="/img/btn-remove.svg" className="clear cu-p" alt="clear"/>}
        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
      </div>
    </div>

    <div className="d-flex flex-wrap">
      {renderItems()}
    </div>

  </div>
  );
}

export default Home;
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import { Route,  Routes } from 'react-router-dom';
import AppContext from "./contex";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  /*Запрос на бэк для получения массива данных с mockapi 
  useEffect нужен чтобы запрос отправился 1 раз при загрузке страницы, а не при каждом рендере App*/
  React.useEffect(() => {
    /*fetch('https://680b7472d5075a76d98b2cd7.mockapi.io/items').then(res => {
      return res.json();
    }).then(json => {
      setItems(json);
    });
    */
    async function fetchData() {
      const cartResponse = await axios.get('https://680b7472d5075a76d98b2cd7.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://68136c1e129f6313e2113452.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://680b7472d5075a76d98b2cd7.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);    
      setFavorites(favoritesResponse.data);     
      setItems(itemsResponse.data);   
    }

    fetchData();
  }, [])

  const onAddToCart = (obj) => {
    console.log(obj);
    
    if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))) {
      axios.delete(`https://680b7472d5075a76d98b2cd7.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://680b7472d5075a76d98b2cd7.mockapi.io/cart', obj).then(res => setCartItems((prev) => [...prev, res.data])) 
    }
    
    
    //axios.post('https://680b7472d5075a76d98b2cd7.mockapi.io/cart', obj).then(res =>  setCartItems((prev) => [...prev, res.data]))     
    
    /* Вариант как с избранным
    if (cartItems.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://680b7472d5075a76d98b2cd7.mockapi.io/cart/${obj.id}`);  
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
    } else {
      axios.post('https://680b7472d5075a76d98b2cd7.mockapi.io/cart', obj).then(res => setCartItems((prev) => [...prev, res.data]))     
    }
    */
    /*cartItems.map((item) => (
      item.imageUrl !== obj.imageUrl && setCartItems(prev => [...prev, obj])
    ));*/
    //в реакте использовать push метод массива опасно, надо юзать спред оператор [...], prev берет последние данные, использовать [...cartItems] опасно
  };

  const onAddToFavorites = (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://68136c1e129f6313e2113452.mockapi.io/favorites/${obj.id}`);  
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
    } else {
      axios.post('https://68136c1e129f6313e2113452.mockapi.io/favorites', obj).then(res => setFavorites((prev) => [...prev, res.data]))     
    }
  };

  const onRemoveItem = (obj) => {
    axios.delete(`https://680b7472d5075a76d98b2cd7.mockapi.io/cart/${obj.id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
  }

  //реализация поиска
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  } 

  return (
    <AppContext.Provider value={{cartItems, favorites, items}}>
      <div className="wrapper clear">
        {cartOpened && <Drawer 
          items= {cartItems} 
          onClose={() => setCartOpened(false)} 
          onRemove={onRemoveItem}
        />}
        <Header onClickCart={() => setCartOpened(true)}/>

        <Routes>
          <Route path="/" element = {
            <Home
              cartItems = {cartItems}
              items = {items}
              searchValue = {searchValue}
              setSearchValue = {setSearchValue}
              onChangeSearchInput = {onChangeSearchInput}
              onAddToFavorites = {onAddToFavorites}
              onAddToCart = {onAddToCart}
              isLoading = {isLoading}
              favorites = {favorites}
            />
          } exact>
          </Route>
        </Routes>

        <Routes>
          <Route path="/favorites" element = {
            <Favorites
            onAddToFavorites = {onAddToFavorites}
            />
          } exact>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

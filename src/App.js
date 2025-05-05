import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import { Route,  Routes } from 'react-router-dom';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  /*Запрос на бэк для получения массива данных с mockapi 
  useEffect нужен чтобы запрос отправился 1 раз при загрузке страницы, а не при каждом рендере App*/
  React.useEffect(() => {
    /*fetch('https://680b7472d5075a76d98b2cd7.mockapi.io/items').then(res => {
      return res.json();
    }).then(json => {
      setItems(json);
    });
    */
    axios.get('https://680b7472d5075a76d98b2cd7.mockapi.io/items').then(res => {
      setItems(res.data);     
    });
    axios.get('https://680b7472d5075a76d98b2cd7.mockapi.io/cart').then(res => {
      setCartItems(res.data);     
    });
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://680b7472d5075a76d98b2cd7.mockapi.io/cart', obj);     
    setCartItems((prev) => [...prev, obj])

    /*cartItems.map((item) => (
      item.imageUrl !== obj.imageUrl && setCartItems(prev => [...prev, obj])
    ));*/
    //в реакте использовать push метод массива опасно, надо юзать спред оператор [...], prev берет последние данные, использовать [...cartItems] опасно
  };

  const onAddToFavorites = (obj) => {
    axios.post('https://68136c1e129f6313e2113452.mockapi.io/favorites', obj);     
    setFavorites((prev) => [...prev, obj])
  };

  const onRemoveItem =(id) => {
   axios.delete(`https://680b7472d5075a76d98b2cd7.mockapi.io/cart/${id}`);
   setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  //реализация поиска
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  } 

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items= {cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={() => setCartOpened(true)}/>

      <Routes>
        <Route path="/" element = {
          <Home
           items = {items}
           searchValue = {searchValue}
           setSearchValue = {setSearchValue}
           onChangeSearchInput = {onChangeSearchInput}
           onAddToFavorites = {onAddToFavorites}
           onAddToCart = {onAddToCart}
          />
        } exact>
        </Route>
      </Routes>
      


    </div>
  );
}

export default App;

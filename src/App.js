import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
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
    
    setCartItems(prev => [...prev, obj])

    /*cartItems.map((item) => (
      item.imageUrl !== obj.imageUrl && setCartItems(prev => [...prev, obj])
    ));*/
    //в реакте использовать push метод массива опасно, надо юзать спред оператор [...], prev берет последние данные, использовать [...cartItems] опасно
  };
  //реализация поиска
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  } 

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items= {cartItems} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
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
          {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <Card 
              key={index}
              title= {item.title}
              price= {item.price}
              imageUrl={item.imageUrl}
              onFavorite ={() => console.log("В закладки")}
              onPlus ={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;

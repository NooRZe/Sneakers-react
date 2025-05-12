import styles from './Card.module.scss'
import React from 'react';
import ContentLoader from "react-content-loader"

function Card({
  onFavorite, 
  id, 
  title, 
  imageUrl, 
  price, 
  onPlus, 
  favorited = false, 
  added = false,
  loading = false
}) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({id, title, imageUrl, price});
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({id, title, imageUrl, price});
    setIsFavorite(!isFavorite);
  };

    return (
    <div className={styles.card}>
      {loading ?  
      <ContentLoader 
        speed={2}
        width={150}
        height={250}
        viewBox="0 0 150 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="155" /> 
        <rect x="0" y="160" rx="0" ry="0" width="150" height="15" /> 
        <rect x="0" y="180" rx="5" ry="5" width="100" height="15" /> 
        <rect x="0" y="220" rx="5" ry="5" width="80" height="25" /> 
        <rect x="116" y="215" rx="10" ry="10" width="32" height="32" />
       </ContentLoader>
       :
        <>
          <div className={styles.favorite}>
              <img onClick={onClickFavorite} src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between  align-center"> 
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="plus"></img>
          </div>
        </>}
    </div>  
  );
}

export default Card;
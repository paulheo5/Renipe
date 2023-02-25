import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function CardItem(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        //alert(JSON.stringify(e));
        console.log(props.id);

        window.localStorage.setItem("id", props.id);
        navigate("/RecipeInfo");
    }



  return (
      <>
          <li className='cards__item' onClick={handleClick}>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Recipe'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}



export default CardItem;

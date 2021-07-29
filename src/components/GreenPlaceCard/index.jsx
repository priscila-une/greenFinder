import React from 'react';
import ReactStars from "react-rating-stars-component";

import floresta from '../../assets/treee.png';

import { Address, Restaurant, RestaurantInfo, RestaurantPhoto, Title } from './styles';

const GreenPlaceCard = ({ park , onClick }) => (
<Restaurant onClick={onClick}>
    <RestaurantInfo>
        <Title>{park.name}</Title>
        <ReactStars count={5} isHalf value={4} edit={false} activeColor="#e7711c"/>
        <Address>{park.vicinity || park.formatted_address}</Address>
    </RestaurantInfo>
    <RestaurantPhoto 
        src={ park.photos ? park.photos[0].getUrl() : floresta}
        alt="Foto do lugar" />
</Restaurant>
);

export default GreenPlaceCard;
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { setParks, setPark } from '../../redux/modules/parks';

export const MapContainer = (props) => { 
    const dispatch = useDispatch();
    const { parks } = useSelector((state) => state.parks);
    const [ map, setMap ] = useState(null);
    const { google, query , placeId} = props;

    useEffect(() => {
        if(query){
            searchByQuery(query);
        }
    }, [query]);

    useEffect(() => {
        if(placeId){
            getParkById(placeId);
        }
    }, [placeId])

    function getParkById(placeId){
        const service = new google.maps.places.PlacesService(map);
        dispatch(setPark(null));
        const request = {
            placeId,
            fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number'],
        };

        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK){
                dispatch(setPark(place));
            }
        });
    }

    function searchByQuery(query){
        const service = new google.maps.places.PlacesService(map);
        dispatch(setParks([]));
        const request = {
            location: map.center,
            radius: '200',
            type: ['park'],
            query,
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK){
                dispatch(setParks(results));
            }
        });
    }
   
    function searchNearby(map, center){
        const service = new google.maps.places.PlacesService(map);
        dispatch(setParks([]));
        
        const request = {
            location: center,
            radius: '20000',
            type: ['park'],
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK){
                dispatch(setParks(results));
            }
        });
    }
    
    function onMapReady(_, map){
        setMap(map);
        searchNearby(map, map.center);
    }

    return (
    <Map 
    google={google}
    centerAroundCurrentLocation
    onReady={onMapReady}
    onRecenter={onMapReady}
    {...props}>
        {parks.map((park) => (
           <Marker 
           key={park.place_id}
           name={park.name}
           position={{
               lat: park.geometry.location.lat(),
               lng: park.geometry.location.lng(),
           }} 
           />     
        ))}
    </Map>     
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    language: 'pt-BR',
})(MapContainer);
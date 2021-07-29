export const Types ={
    SET_PARKS: 'parks/SET_PARKS',
    SET_PARK: 'parks/SET_PARK',
};

const initialState = {
    parks: [],
    parkSelected: null,
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case Types.SET_PARKS:
         return { ...state, parks: action.payload };
        case Types.SET_PARK:
            return { ...state, parkSelected: action.payload};
        default:
            return state;
    }
}

export function setParks(parks){
    return {
        type: Types.SET_PARKS,
        payload: parks,
    };
}

export function setPark(park){
    return {
        type: Types.SET_PARK,
        payload: park,
    };
}

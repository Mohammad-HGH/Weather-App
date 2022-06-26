import Api from '../api/Api'

const APIKEY: string = 'd83249ec98df4883b35114524222606'



export const GetWeather = ( fn: Function, city: string | number ): void => {
    Api
        .get( `current.json?key=${ APIKEY }&q=${ city }&aqi=yes`, '', '' )
        .then( ( response ) => {
            fn( response.data )
        } )
        .catch( ( err ) => console.log( err ) )
}

export const GetDaysWeather = ( fn: Function, city: string ): void => {
    Api
        .get( `forecast.json?key=${ APIKEY }&q=${ city }&days=3&aqi=yes&alerts=no`, '', '' )
        .then( ( response ) => {
            fn( response.data.forecast.forecastday )
        } )
        .catch( ( err ) => console.log( err ) )
}

export const GetUserLocation = ( fn: Function ): void => {
    if ( navigator.geolocation ) {
        navigator.geolocation.watchPosition( function ( position ) {
            fn( position.coords.latitude )
        } )
    }
}
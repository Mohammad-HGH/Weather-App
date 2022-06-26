import axios from 'axios'
import Cookies from 'js-cookie'



const config = {
  baseUrl: 'https://api.weatherapi.com/v1/',
  udata: Cookies.get( 'token' ),
  axiosHandle: () => {
    return axios.create( {
      baseURL: config.baseUrl,
      validateStatus: function ( status: any ) {
        if ( status === 401 ) {
          localStorage.clear()
        }
        return status >= 200 && status < 300
      },
      headers: config.udata
        ? {
          Authorization: 'Bearer ' + config.udata,
        }
        : {},
    } )
  },
}
export default config
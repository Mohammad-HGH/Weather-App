function Importer ( r: any ) {
    let images: any = {}
    r.keys().map( ( item: any ) => {
        return images[ item.replace( './', '' ) ] = r( item )
    } )
    return images
}

const images = Importer( require.context( '../assets/images/', true, /\.(png|jpe?g|svg|jpg)$/ ) )
export default images
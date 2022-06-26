export class LoaderFrame {
  constructor(loader, loadElement, scene) {
    loader.load( loadElement, function ( gltf ) {
      gltf.scene.traverse( function( node ) {
        if ( node.isMesh ) { node.castShadow = true; }
      });
      scene.add( gltf.scene );
  
    }, undefined, function ( error ) {
  
      console.error( error );
  
    } );
  }
}
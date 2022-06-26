export class House {  
  constructor (info) {
    this.position = info.position;
    this.rotation = info.rotation;
    this.index = info.index;
    this.scale = info.scale || undefined; 
    this.totalSize = 8455030;

    
    info.gltfloader.load(info.src, (gltf)=> {

      this.scene = gltf.scene;
      this.mesh = gltf.scene.children[0];
      this.mesh.position.set(this.position.x, this.position.y, this.position.z);
			this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
      if(this.scale!==undefined) {
        gltf.scene.position.set(this.position.x, this.position.y, this.position.z);
        gltf.scene.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        gltf.scene.scale.set(0.2,0.2,0.2)
      }
      
      gltf.scene.traverse( ( node )=> {
        if ( node.isMesh ) {
          node.castShadow = true; 
          node.name="팝업"+this.index;
        }
      });
      info.scene.add( gltf.scene );
      }, (xhr)=> {
        //console.log(xhr.loaded)
        //console.log('Ajax object', (xhr.loaded / this.totalSize * 100) + '% loaded');
    })
  }
}

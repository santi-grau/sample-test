import { Scene, WebGLRenderer, PerspectiveCamera, IcosahedronGeometry, Mesh, MeshBasicMaterial } from 'three'
class AppMain extends HTMLElement{
    connectedCallback(){
        this.camera = new PerspectiveCamera( )
        this.scene = new Scene()
        this.renderer = new WebGLRenderer( { antialias : true, alpha : true } )
        this.appendChild( this.renderer.domElement)

        this.mesh = new Mesh( new IcosahedronGeometry(0.5,4), new MeshBasicMaterial({color : 0xff0000, wireframe : true }))
        this.scene.add(this.mesh)

        this.onResize()
        window.addEventListener('resize', () => this.onResize() )
        this.step( 0 )
    }

    onResize( ) {
        var [ width, height ] = [ this.offsetWidth, this.offsetHeight ]
        this.renderer.setSize( width, height )
		this.renderer.setPixelRatio( Math.min( 2, window.devicePixelRatio * 2 ) )
        var camView = { fov : 6, aspect : width / height, near : 0.01, far : 100 }
        for ( var prop in camView ) this.camera[ prop ] = camView[ prop ]
        if( height < width ) this.camera.position.z = 1 / 2 / Math.tan(Math.PI * this.camera.fov / 360);
        else this.camera.position.z = (height / width ) / 2 / Math.tan(Math.PI * this.camera.fov / 360);
        this.camera.updateProjectionMatrix()
    }

    step( time ){
        requestAnimationFrame( ( time ) => this.step( time ) )
        this.mesh.rotation.y += 0.01
        this.renderer.render(this.scene, this.camera);
    }
}

window.customElements.define('app-main', AppMain);

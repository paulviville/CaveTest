import CaveWindow from "./CaveJS/CaveWindow.js";

export default class WindowsManager {
	#windows = new Map( );

    constructor ( ) {
		window.addEventListener( "beforeunload", ( ) => {
            this.#beforeUnload( );
        } );
    }

    addWindow ( windowData, callbacks ) {
        const caveWindow = new CaveWindow(
                windowData.id,
				windowData.name,
				windowData.width,
				windowData.height,
				{ 
					onLoad: ( canvas ) => {
						callbacks.onLoad?.( windowData.id, canvas );
					},
                    onResize: ( width, height ) => {
						callbacks.onResize?.( windowData.id, width, height );
                    }
				}
        );
        caveWindow.open( windowData.display );
        this.#windows.set( windowData.id, caveWindow );
    }

    #beforeUnload ( ) {
		this.#windows.forEach( window => window.close( ) );
    }
}
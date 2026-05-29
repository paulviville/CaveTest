const caveConfigReims = {
	// mode: "Sequential", // "SbS"
	stereoMode: "SbS", // "SbS"
	
	windows: [
		{
			id: 0,
			display: 0,
			name: "left",
			width: 430,
			height: 300,
		},
		{
			id: 1,
			display: 1,
			name: "right",
			width: 430,
			height: 300,
		},
		{
			id: 2,
			display: 1,
			name: "floor",
			width: 430,
			height: 300,
		}
	],

/// 2 ------ 3
/// | Screen |
/// 0 ------ 1
	screens: [
		{
			name: "left",
			corners: [
				[ 0, 4, 0],
				[ 4, 4, 0],
				[ 0, 4, 2.5],
				[ 4, 4, 2.5]
			],
			window: 0 
		},
		{
			name: "right",
			corners: [ 
				[ 4, 4, 0],
				[ 4, 0, 0],
				[ 4, 4, 2.5],
				[ 4, 0, 2.5]
			],
			window: 0 
		},
		{
			name: "floor",
			corners: [
				[ 0, 0, 0],
				[ 0, 4, 0],
				[ 4, 0, 0],
				[ 4, 4, 0]
			],
			window: 0 
		}
	],

	viewports: [
		{
			id: 0,
			width: 430,
			height: 300,
			left: 0,
			bottom: 0,
			screen: 0,
			window: 0,
		},
		{
			id: 1,
			width: 430,
			height: 300,
			left: 0,
			bottom: 0,
			screen: 1,
			window: 1,
		},
		{
			id: 2,
			width: 430,
			height: 300,
			left: 0,
			bottom: 0,
			screen: 2,
			window: 2,
		}
	],
}


export default caveConfigReims;
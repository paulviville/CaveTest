const caveConfigReims = {
	mode: "Sequential", // "SbS"
	
	windows: [
		{
			id: 0,
			display: 0,
			name: "left",
			width: 960,
			height: 300,
		},
		{
			id: 1,
			display: 1,
			name: "right",
			width: 960,
			height: 300,
		},
		{
			id: 2,
			display: 2,
			name: "floor",
			width: 960,
			height: 300,
		}
	],

///		2 ------ 3
///     | Screen |
///     0 ------ 1
	screens: [
		{
			name: "leftScreen",
			corners: [
				[ 0, 4, 0],
				[ 4, 4, 0],
				[ 0, 4, 2.5],
				[ 4, 4, 2.5]
			],
			window: 0 
		},
		{
			name: "rightScreen",
			corners: [ 
				[ 4, 4, 0],
				[ 4, 0, 0],
				[ 4, 4, 2.5],
				[ 4, 0, 2.5]
			],
			window: 0 
		},
		{
			name: "floorScreen",
			corners: [
				[ 0, 0, 0],
				[ 0, 4, 0],
				[ 4, 0, 0],
				[ 4, 4, 0]
			],
			window: 0 
		}
	],
}


export default caveConfigReims;
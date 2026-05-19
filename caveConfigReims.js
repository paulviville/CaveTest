const caveConfigReims = {
	mode: "Sequential", // "SbS"
	
	windows: [
		{
			id: 0,
			channel: 0,
			name: "main",
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
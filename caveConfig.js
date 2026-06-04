const caveConfig = {
	stereoMode: "Sequential", /// "Sequential" || "SbS"
	frameRate: 60,

	windows: [
		{
			id: 0,
			display: 0,
			name: "main",
			width: 1290,
			height: 300,
		}
	],

/// 2 ------ 3
/// | Screen |
/// 0 ------ 1
	screens: [
		{
			id: 0,
			name: "left",
			corners: [
				[ -2.5455844122715714, 0, 0 ],
				[ 0, 2.5455844122715714, 0 ],
				[ -2.5455844122715714, 0, 2.25 ],
				[ 0, 2.5455844122715714, 2.25 ]
			],
		},
		{
			id: 1,
			name: "right",
			corners: [ 
				[ 0, 2.5455844122715714, 0 ],
				[ 2.5455844122715714, 0, 0 ],
				[ 0, 2.5455844122715714, 2.25 ],
				[ 2.5455844122715714, 0, 2.25 ]
			],
		},
		{
			id: 2,
			name: "floor",
			corners: [
				[ -1.590990257669732, 0.9545941546018395, 0 ],
				[ 0.9545941546018395, -1.590990257669732, 0 ],
				[ 0, 2.5455844122715714, 0 ],
				[ 2.5455844122715714, 0, 0 ]
			],
		},
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
			left: 430,
			bottom: 0,
			screen: 1,
			window: 0,
		},
		{
			id: 2,
			width: 430,
			height: 300,
			left: 860,
			bottom: 0,
			screen: 2,
			window: 0,
		},
	],

	vrpn: {
		trackers: [
			{ target: "head", signal: "HMD" },
			{ target: "leftHand", signal: "LeftController" },
			{ target: "rightHand", signal: "RightController" },
			/// targets "extra"
		],
		analogs: [
			{ target: "leftStick", signal: "JCLS" },
			{ target: "rightStick", signal: "JCRS" },
		],
		buttons: [
			{ 
				signal: "JCLB",
				values: [ 0, 1, 2, 3, 4, 6, 7, 10 ]
			},
			{ 
				signal: "JCRB",
				values: [ 0, 1, 2, 3, 4, 6, 7, 10 ]
			},
		],
	}
}


export default caveConfig;
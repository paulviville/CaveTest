const caveConfig = {
	stereoMode: "Sequential", /// "Sequential" || "SbS"
	frameRate: 120,

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
			width: 1920,
			height: 1200,
			left: 0,
			bottom: 0,
			screen: 0,
			window: 0,
		},
		{
			id: 1,
			width: 1920,
			height: 1200,
			left: 1920,
			bottom: 0,
			screen: 1,
			window: 0,
		},
		{
			id: 2,
			width: 1920,
			height: 1200,
			left: 3840,
			bottom: 0,
			screen: 2,
			window: 0,
		},
	],

	vrpn: {
		trackers: [
			{ target: "head", signal: "HMD", sensor: 0 },
			{ target: "leftHand", signal: "LeftController", sensor: 0 },
			{ target: "rightHand", signal: "RightController", sensor: 0 },
			/// targets "extra"
		],
		analogs: [
			{ target: "leftStick", signal: "JCLS" },
			{ target: "rightStick", signal: "JCRS" },
		],
		buttons: [
			{ 
				signal: "JCLB",
				values: [ 0, 1, 2, 3, 4, 6, 7, 10 ],
                mapping: {
                    7: "LeftTrigger",
                    0: "Left0", /// JC right
                    1: "Left1",
                    2: "Left2",
                    3: "Left3",
                }
			},
			{ 
				signal: "JCRB",
				values: [ 0, 1, 2, 3, 4, 6, 7, 10 ],
                mapping: {
                    7: "RightTrigger",
                    0: "Right0", /// JC right
                    1: "Right1",
                    2: "Right2",
                    3: "Right3",
                }
			},
		],
	}
}


export default caveConfig;
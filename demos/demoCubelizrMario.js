//Cubic.In
var demoCubelizrMario = {
	"config" : {
		"mouse_control" : 1,
		"display_grid" : 0,
		"display_stats" : 0
	},

	"textures": [
		{ "id": 1, "url": ["./img/textures/tq.png"]},
		{ "id": 2, "url": ["./img/textures/t5.png", "./img/textures/t5.png", "./img/textures/t4.png", "./img/textures/t5.png", "./img/textures/t5.png", "./img/textures/t5.png"]},
		{ "id": 3, "url": ["./img/textures/ta.jpg"]}
	],
	"defaults": {
		"type": "cube",
		"opacity": 1.0,
		"duration": 3.0,
		"animation": "Exponential.InOut",
		"height": 500,
		"texture": 2
	},
	"objects": []
};

// Add floor
for(var i=0;i<8;i++)
	for(var j=0;j<8;j++)
		demoCubelizrMario.objects.push({x: i, y: j, start: i*-0.5+3.0});

_.findWhere(demoCubelizrMario.objects, { x: 2, y: 6 }).texture = 3;
_.findWhere(demoCubelizrMario.objects, { x: 2, y: 7 }).texture = 3;
_.findWhere(demoCubelizrMario.objects, { x: 1, y: 4 }).texture = 3;
_.findWhere(demoCubelizrMario.objects, { x: 1, y: 5 }).texture = 3;
_.findWhere(demoCubelizrMario.objects, { x: 1, y: 6 }).texture = 3;
_.findWhere(demoCubelizrMario.objects, { x: 1, y: 7 }).texture = 3;

// Second level
for(var i=0;i<8;i++)
	demoCubelizrMario.objects.push({x: i, y: 0, z: 1, start: i*-0.5+3.0});
for(var j=1;j<8;j++)
	demoCubelizrMario.objects.push({x: 0, y: j, z: 1, start: 3.5});

_.findWhere(demoCubelizrMario.objects, { x: 0, y: 4, z: 1 }).texture = 3;

// Question block
demoCubelizrMario.objects.push(
	{ x: 4, y: 4, z: 3, start: 7.0, texture: 1, animation: "Bounce.InOut"}
);

//array holding pokemans
var vPokes : GameObject[];
//pokeman prefabs
var vPref : GameObject;
var vPref2 : GameObject;
//percentage of first pokemon
var vPerc : int = 100;

var vRange : int = 10;
var vRng : int = 0;

function Awake () 
{
Spawn();
}

function Spawn () 
{
for(var p : int = 0; p < vPokes.length; p++)
{
	if(vPokes[p] == null)
	{
		vRng = Random.Range(0, 100);
		if(vRng <= vPerc)
		{
		vPokes[p]=Instantiate(vPref);
		}
		else
		{
			vPokes[p]=Instantiate(vPref2);
		}
		vPokes[p].transform.parent = gameObject.transform;
		R();
		vPokes[p].transform.position.x = gameObject.transform.position.x + vRng;
		R();
		vPokes[p].transform.position.z = gameObject.transform.position.z + vRng;
		vPokes[p].transform.position.y = gameObject.transform.position.y;
		
	}
	}
}

function R()
{
	vRng = Random.Range(-vRange, vRange);
}
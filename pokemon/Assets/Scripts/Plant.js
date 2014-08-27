//counter to full growth
var vCmax : int = 2;
var vCounter : int;
//is this the last state?
var vLast : int;

//player
var vP : GameObject;
var vS : Component;
//place in array
var vSpot : int;

//next state or product prefab
var vNext : GameObject;

function Awake()
{
	vCounter = vCmax;
	vP = GameObject.FindWithTag("Player");
	vS = vP.GetComponent(Player);
}

function Counter () 
{
//grow if not fully grown
if(vLast == 0)
{
	if(vCounter > 0)
	{
		vCounter--;
	}
	else
	{
		vCounter = vCmax;
		NextStage();
	}
	}
}
//instantiates next stage
function NextStage()
{
		var p = Instantiate(vNext, transform.position, transform.rotation);
			vS.vPlants[vSpot] = p;
			p.GetComponent(Plant).vSpot = vSpot;
			Destroy(gameObject);
}
//harvest
function OnHit () 
{
	vS.vPlants[vSpot] = null;
	Instantiate(vNext, transform.position, transform.rotation);
	Destroy(gameObject);
}


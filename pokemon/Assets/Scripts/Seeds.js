//cooldown vars
var vCool : int = 10;
var vHeld : int = 0;
//player and raycaster
var vPlayer : GameObject;
var vS : Component;
var vCas : Component;
//plant PrefabType
var vPref : GameObject;

function Awake () 
{

	vPlayer = GameObject.FindWithTag ("Player");
	vS = vPlayer.GetComponent(Player);
	vCas = vPlayer.GetComponentInChildren(Caster);
}

function Update () 
{
	if(vCool > 0)
	{
		vCool--;
	}
	else if(vHeld == 1)
	{
		if(Input.GetMouseButtonDown(0))
		{
			//instantiate plant here
			vCas.fPlant(vPref, gameObject);
			
		}
	}
}

function OnHit () 
{
	vCool = 10;
	for(var i : int = 0; i < vS.vInv.length; i++)
	{
		if(vS.vInv[i] == null)
		{
			//print("found empty");
			rigidbody.isKinematic = true;
			transform.parent = vS.vPos;
			transform.position = vS.vPos.position;
			transform.eulerAngles = transform.parent.eulerAngles;
			

			vS.vInv[i] = gameObject;
			vS.vInvIc[i] = gameObject.GetComponent(Info).vIcon;
			
			
			
			vS.vCurr = i;
			//print(this.gameObject);
			vHeld = 1;
			break;
		}
	}
}

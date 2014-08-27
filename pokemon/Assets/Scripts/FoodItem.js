var vFoodValue : int;
var vPrice : int;
var vHeld : int = 0;
var vCool : int = 10;

var vPlayer : GameObject;
var vS : Component;
var vCas : Component;

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
if(vHeld == 1 && vCool <= 0)
{
	if(Input.GetMouseButtonDown(0))
	{
		vCas.Feed(vFoodValue, vPrice, gameObject);
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
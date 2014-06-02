var vPlayer : GameObject;
var vS : Component;

var vCas : Component;

var vHeld : int = 0;

var vContent : GameObject;
//cooldown on pickup
var vCool : int = 10;
//cooldown on release;
var vRel : int = 20;

var vDark : Texture2D;
var vLit : Texture2D;

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
	if(vRel > 0)
	{
		vRel--;
	}


	if(vHeld == 1 && vCool == 0)
	{
		if(Input.GetMouseButtonDown(0) && vCas.vMenu == 0)
		{
			//if ball is empty
			if(vContent == null)
			{
				
				
				rigidbody.isKinematic = false;
				transform.parent = null;
				rigidbody.AddRelativeForce(Vector3.forward * 700);
				
				vS.vInv[vS.vCurr] = null;
				vS.vInvIc[vS.vCurr] = vS.vEmpty;
				
				vHeld = 0;
			}
			//if not empty
			else
			{
				vCas.Release(gameObject);
				vRel = 100;

			}
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
			print(i);
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

//resets on inv switch
function Reset()
{
	vCool = 0;
	vRel = 0;
}

function OnCollisionEnter(collision : Collision) 
{
	if(collision.gameObject.tag == "Pokemon" && vContent == null)
	{
	if(vRel <= 0)
	{
		collision.transform.SendMessage ("Ball", gameObject);
	}
	}
}
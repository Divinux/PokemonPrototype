//target pokemon
var vTarget : Transform;
//target script
var vTs : Component;

//countdown for hit
var vHit : int = 0;
//countdown between hits
var vC : int = 0;
//is the item in player hand
var vHeld :int = 0;

var vPlayer : GameObject;
var vS : Component;
var vCam : GameObject;

var vBut : GameObject;
var vRed: Texture2D;
var vGreen : Texture2D;


function Awake()
{
	vCam = gameObject.FindWithTag("MainCamera");
	vPlayer = GameObject.FindWithTag ("Player");
	vS = vPlayer.GetComponent(Player);
}

function OnGUI () 
{
	if(vHit >= 1)
	{
		GUI.Box(Rect(0,0,200,200)," ");
		GUI.Label (Rect (10, 10, 100, 20), "" + vTs.vName);
		GUI.Label (Rect (10, 30, 100, 20), "Level: " + vTs.vLvl);
		
		GUI.Label (Rect (10, 70, 100, 20), "HP: " + vTs.vHP + "/" + vTs.vMaxHP);
		GUI.Label (Rect (10, 90, 100, 20), "STR: " + vTs.vStr);
		GUI.Label (Rect (10, 110, 100, 20), "Speed: " + vTs.vCountdown);
		
		if(vTs.vOwned != 0)
		{
			GUI.Label (Rect (10, 50, 100, 20), "Exp: " + vTs.vHits + "/" + vTs.vExpLeft);
		}
		
		
	}
}

function Update () 
{
	if(vHeld == 1)
	{
		if(vHit>0)
		{
			vHit--;
			if(vBut.renderer.material.mainTexture != vGreen)
			{
				vBut.renderer.material.mainTexture = vGreen;
			}
		}
		else if(vBut.renderer.material.mainTexture != vRed)
		{
			vBut.renderer.material.mainTexture = vRed;
		}
		vC--;
		
		if(vC <= 0)
		{
			var hit : RaycastHit;
			if (Physics.Raycast (vCam.transform.position, vCam.transform.forward, hit, 200))
			{
				//print(hit.transform);
				//Debug.DrawLine (vCam.transform.position, hit.point);
				vTarget = hit.transform;
				
				if(vTarget.gameObject.tag == "Pokemon")
				{
					vHit = 100;
					if(vTarget.gameObject.GetComponent(Pokeman) != vTs)
					{
						vTs = vTarget.gameObject.GetComponent(Pokeman);
						if(vBut.renderer.material.mainTexture != vRed)
						{
							vBut.renderer.material.mainTexture = vRed;
						}
					}
					
				}
			}
		}
		else
		{
			vC = 10;
		}
		
	}
}

//resets on inv switch
function Reset()
{
	vBut.renderer.material.mainTexture = vRed;
	vHit = 0;
}

function OnHit () 
{

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

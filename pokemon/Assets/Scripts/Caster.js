var vDist : float = 200;
var vHitObj : Transform;

var vP : GameObject;
var vS : Component;


//garbage vars
var vPk : GameObject;
var vPs :Component;
var vN : String;

var vCam : GameObject;

var vMenu : int = 0;
var hSliderValue : float = 15.0;

var vMl1 : Component;
var vMl2 : Component;

function Awake()
{
	vP = transform.root.gameObject;
	vS = vP.GetComponent(Player);
	vCam = gameObject;
	vMl1 = vP.GetComponent(MouseLook);
	vMl2 = gameObject.GetComponent(MouseLook);
}

function OnGUI () 
{
	if(vMenu == 1)
	{
	GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
	GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
	GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
    hSliderValue = GUI.HorizontalSlider (Rect (25, 25, 100, 30), hSliderValue, 0.1, 20);
	GUI.Label(Rect(25, 45, 100,20),"Sensitivity: " + hSliderValue);
	GUI.Label(Rect(25, 65, 100,20),"Money: " + vS.vMoney);
	
	if(GUI.Button(Rect(25, Screen.height-50, 100,20),"Save"))
	{
		vP.GetComponent(InfoReader).ReadInfos();
	}
	if(GUI.Button(Rect(130, Screen.height-50, 100,20),"Load"))
	{
		vN = vP.GetComponent(InfoReader).vfileName;
		vP.GetComponent(InfoReader).ReadFile(vN);
	}
	
	}
}

function Update ()
{

if(Input.GetKeyDown("escape"))
	{
		if(vMenu == 1)
		{
		vMenu = 0;
		vMl1.enabled = true;
		vMl2.enabled = true;
		}
		else
		{
		vMenu = 1;
		vMl1.enabled = false;
		vMl2.enabled = false;
		}
	}

if(vMenu == 0)
{
	Screen.lockCursor = true;
	Screen.showCursor = false;
	
	//empty hands raycast
	if(vS.vInv[vS.vCurr] == null)
	{
		if(Input.GetMouseButtonDown(0))
		{
			var hit : RaycastHit;
			if (Physics.Raycast (this.transform.position, this.transform.forward, hit, vDist))
			{
				print(hit.transform);
				Debug.DrawLine (this.transform.position, hit.point);
				vHitObj = hit.transform;
				vHitObj.SendMessage ("OnHit");
			}
		}
	}
	
	
}
else
{
	Screen.lockCursor = false;
	Screen.showCursor = true;
}

if(vMl1.sensitivityX != hSliderValue || vMl2.sensitivityY != hSliderValue)
{
	vMl1.sensitivityX = hSliderValue;
	vMl2.sensitivityY = hSliderValue;
}

}



function Release(bl : GameObject)
{
	//get pokemon
	vPk = bl.GetComponent(Pokeball).vContent;
	vPs = vPk.GetComponent(Pokeman);
	
	//set pokeball to empty
	bl.GetComponent(Pokeball).vContent = null;
	bl.renderer.material.mainTexture = bl.GetComponent(Pokeball).vDark;
	//release pokomon
	vPk.transform.rigidbody.isKinematic = false;
	vPk.transform.rotation = vPk.transform.parent.rotation;
	vPk.transform.parent = null;
	vPk.collider.enabled = false;
	vPk.SetActive(true);
	vPk.rigidbody.AddRelativeForce(Vector3.forward * 200);
	vPk.transform.rotation.x = 0;
	vPk.transform.rotation.z = 0;
	enable();

	var hit : RaycastHit;
	if (Physics.Raycast (this.transform.position, this.transform.forward, hit, vDist))
	{
		//print(hit.transform);
		//Debug.DrawLine (this.transform.position, hit.point);
		vHitObj = hit.transform;
		
		if(vHitObj.gameObject.tag == "Pokemon")
		{
			vPs.vT = vHitObj.gameObject;
			
			
		}
	}
}

function Bat(i : int)
{
	var hit : RaycastHit;
	if (Physics.Raycast (this.transform.position, this.transform.forward, hit, 2))
	{
		//print(hit.transform);
		//Debug.DrawLine (this.transform.position, hit.point);
		vHitObj = hit.transform;
		
		if(vHitObj.gameObject.tag == "Pokemon")
		{
			vHitObj.gameObject.GetComponent(Pokeman).Dmg(i);
			vHitObj.gameObject.GetComponent(Pokeman).vT = vP;
			vHitObj.gameObject.GetComponent(Pokeman).vA = vP;
			
			
		}
	}
}

function Medi(i : int, g : GameObject)
{
var hit : RaycastHit;
	if (Physics.Raycast (this.transform.position, this.transform.forward, hit, 10))
	{
//Debug.DrawLine (this.transform.position, hit.point);
		vHitObj = hit.transform;
		
		if(vHitObj.gameObject.tag == "Pokemon")
		{
vHitObj.gameObject.GetComponent(Pokeman).Heal(i);
vS.vInvIc[vS.vCurr] = vS.vEmpty;

			Destroy(g);
			
			
		}
	}
}

function enable()
{
	yield WaitForSeconds(0.1);
	vPk.collider.enabled = true;
}
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
	vP = GameObject.FindWithTag ("Player");
	vS = vP.GetComponent(Player);
	vCam = gameObject;
	vMl1 = vP.GetComponent(MouseLook);
	vMl2 = gameObject.GetComponent(MouseLook);
	//trigger tutorial
	vMenu = 2;
	vMl1.enabled = false;
	vMl2.enabled = false;
	
	vCam.camera.layerCullSpherical = true;
	var distances = new float[32];
	
	//items
	distances[8] = 30.0;
	//pokemans
	distances[10] = 100.0;
	//plants
	distances[11] = 50.0;
    vCam.camera.layerCullDistances = distances;
	
}

function Start()
{

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
	//tutorial
	if(vMenu == 2)
	{
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		//explain pickingup items
		GUI.Label(Rect(25, 40, Screen.width-50,600),"Welcome to pokemon thingy!\n \n -Pick up items and interact with buttons by clicking on them. \n -You will need free hands!\n -Use the balls to carry monsters.\n -Medipacks heal monsters.\n -The orange scanner gives additional information about the monster it's pointed at.");
		if(GUI.Button(Rect(25, Screen.height-50, 100,20),"Skip"))
		{
			vMenu = 0;
			vMl1.enabled = true;
			vMl2.enabled = true;
		}
		if(GUI.Button(Rect(130, Screen.height-50, 100,20),"Next"))
		{
			vMenu = 3;
		}
	}
	
	if(vMenu == 3)
	{
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		//explain catching pokemon and fightan
		GUI.Label(Rect(25, 40, Screen.width-50,600),"Monsters\n \n -Throw a ball at a monster with less than half HP left to catch it.\n -Click on the ground with a full ball in hand to make the monster follow.\n -Click on a wild monster with a full ball in hand to make your monster attack.");
		if(GUI.Button(Rect(25, Screen.height-50, 100,20),"Skip"))
		{
			vMenu = 0;
			vMl1.enabled = true;
			vMl2.enabled = true;
		}
		if(GUI.Button(Rect(130, Screen.height-50, 100,20),"Next"))
		{
			vMenu = 4;
		}
	}
	
	if(vMenu == 4)
	{
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		GUI.Box(Rect(-10, -10, Screen.width+20,Screen.height+20),"");
		//explain farming
		GUI.Label(Rect(25, 40, Screen.width-50,600),"Farming\n \n -Your monsters need to eat!\n -You can buy food at the yellow dispenser.\n -It's cheaper to grow food! Buy seeds from the green dispenser.");
		if(GUI.Button(Rect(25, Screen.height-50, 100,20),"Skip"))
		{
			vMenu = 0;
			vMl1.enabled = true;
			vMl2.enabled = true;
		}
		if(GUI.Button(Rect(130, Screen.height-50, 100,20),"OK"))
		{
			vMenu = 0;
			vMl1.enabled = true;
			vMl2.enabled = true;
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
function Feed(a:int, b:int, c:GameObject)
{
	var hit : RaycastHit;
	if (Physics.Raycast (this.transform.position, this.transform.forward, hit, 10))
	{
		//Debug.DrawLine (this.transform.position, hit.point);
		vHitObj = hit.transform;
		
		if(vHitObj.gameObject.tag == "Pokemon")
		{
			vHitObj.gameObject.GetComponent(Pokeman).fEat(a);
			//destroy food item
			
			vS.vInvIc[vS.vCurr] = vS.vEmpty;
			Destroy(c);
		}
		else
		{
				c.rigidbody.isKinematic = false;
				c.transform.parent = null;
				c.rigidbody.AddRelativeForce(Vector3.forward * 700);
				
				vS.vInv[vS.vCurr] = null;
				vS.vInvIc[vS.vCurr] = vS.vEmpty;
				
				c.GetComponent(FoodItem).vHeld = 0;
		}
	}
	else
		{
				c.rigidbody.isKinematic = false;
				c.transform.parent = null;
				c.rigidbody.AddRelativeForce(Vector3.forward * 700);
				
				vS.vInv[vS.vCurr] = null;
				vS.vInvIc[vS.vCurr] = vS.vEmpty;
				
				c.GetComponent(FoodItem).vHeld = 0;
		}
}
function fPlant(f : GameObject, l : GameObject)
{

	var hit : RaycastHit;
	if (Physics.Raycast (this.transform.position, this.transform.forward, hit, 10))
	{
		//Debug.DrawLine (this.transform.position, hit.point);
		vHitObj = hit.transform;
		
		if(vHitObj.gameObject.tag == "Terrain")
		{
			var p = Instantiate(f, hit.point, vP.transform.rotation);
			vS.vPlants.Add(p);

			p.GetComponent(Plant).vSpot = vS.vPlants.length-1;
			
			//destroy seed item
			
			vS.vInvIc[vS.vCurr] = vS.vEmpty;
			Destroy(l);
		}
	}

	
}
function enable()
{
	yield WaitForSeconds(0.1);
	vPk.collider.enabled = true;
}
//class to handle the player and inventory
//inventory array
var vInv : GameObject[];
var vInvIc : Texture2D[];
//inventory icon
var vEmpty : Texture2D;
var vActive : Texture2D;


//money
var vMoney : int = 100;

//held position
var vPos : Transform;
//active item
var vCurr : int = 0;

//crosshair
var cross : Texture2D;

//hp
var vMaxHP : int = 100;
var vHP : int;

//growth timer
var vTimer : int;
var vTM : int = 100;
//door timer
var vDoorTimer : int = 0;
//array of all active plants
var vPlants = new Array ();

function Awake () 
{
vHP = vMaxHP;
vTimer = vTM;
}

function OnGUI()
{
	GUI.Box(Rect(Screen.width/2-2,Screen.height/2-2,60,60),cross, "label");
	
	GUI.Box(Rect(Screen.width/2-200,Screen.height - 50,40,40),vInvIc[0], "label");
	GUI.Box(Rect(Screen.width/2-160,Screen.height - 50,40,40),vInvIc[1], "label");
	GUI.Box(Rect(Screen.width/2-120,Screen.height - 50,40,40),vInvIc[2], "label");
	GUI.Box(Rect(Screen.width/2-80,Screen.height - 50,40,40),vInvIc[3], "label");
	GUI.Box(Rect(Screen.width/2-40,Screen.height - 50,40,40),vInvIc[4], "label");
	GUI.Box(Rect(Screen.width/2,Screen.height - 50,40,40),vInvIc[5], "label");
	GUI.Box(Rect(Screen.width/2+40,Screen.height - 50,40,40),vInvIc[6], "label");
	GUI.Box(Rect(Screen.width/2+80,Screen.height - 50,40,40),vInvIc[7], "label");
	GUI.Box(Rect(Screen.width/2+120,Screen.height - 50,40,40),vInvIc[8], "label");
	GUI.Box(Rect(Screen.width/2+160,Screen.height - 50,40,40),vInvIc[9], "label");
	
	if(vCurr == 0)
	{
	GUI.Box(Rect(Screen.width/2-200,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 1)
	{
	GUI.Box(Rect(Screen.width/2-160,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 2)
	{
	GUI.Box(Rect(Screen.width/2-120,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 3)
	{
	GUI.Box(Rect(Screen.width/2-80,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 4)
	{
	GUI.Box(Rect(Screen.width/2-40,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 5)
	{
	GUI.Box(Rect(Screen.width/2,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 6)
	{
	GUI.Box(Rect(Screen.width/2+40,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 7)
	{
	GUI.Box(Rect(Screen.width/2+80,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 8)
	{
	GUI.Box(Rect(Screen.width/2+120,Screen.height - 50,40,40),vActive, "label");
	}
	else if(vCurr == 9)
	{
	GUI.Box(Rect(Screen.width/2+160,Screen.height - 50,40,40),vActive, "label");
	}
	
}

function Update () 
{
	//counter for doors
	if(vDoorTimer > 0)
	{
		vDoorTimer--;
	}

	
	//counter for events
	if(vTimer > 0)
	{
		vTimer--;
	}
	else
	{
		vTimer = vTM;
		//do stuffs in other scripts here
		for (var i = 0; i < vPlants.length; i++)
		{
		if(vPlants[i] != null){
			vPlants[i].transform.SendMessage("Counter");
		}
		}
		
		
	}
	//check for mousewheel scroll
	if (Input.GetAxis("Mouse ScrollWheel") > 0) // forward
	{
		vCurr--;
		if(vCurr < 0)
		{
			vCurr = vInv.length-1;
		}
		SetCurr();
	}
	if (Input.GetAxis("Mouse ScrollWheel") < 0) // back
	{
		vCurr++;
		if(vCurr > vInv.length-1)
		{
			vCurr = 0;
		}
		
		SetCurr();
	}
}

function SetCurr()
{
	for(var i : int = 0; i < vInv.length; i++)
	{
		if(vInv[i] != null)
		{
			vInv[i].SendMessage ("Reset");
			vInv[i].SetActive(false);
		}
	}
	if(vInv[vCurr] != null)
	{
		vInv[vCurr].SetActive(true);
		//print(vCurr);
	}
}

function ClearInv()
{
	for(var i : int = 0; i < vInv.length; i++)
	{
		if(vInv[i] != null)
		{
			Destroy(vInv[i]);
			vInvIc[i] = vEmpty;

		}
	}
}

function Dmg(i : int)
{
	vHP -= i;
	if(vHP <= 0)
	{
		//game over
	}
}
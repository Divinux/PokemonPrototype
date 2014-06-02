import System;
import System.IO;

var vP : GameObject;
var vS : Component;
var vHand : GameObject;
var vInfos : Component[];
var vCounter : int = 0;

var  vfileName = "save.txt";
var vTint : int;
var vTfl : float;

var vItems : GameObject[];

function Awake()
{
	vP = GameObject.FindWithTag ("Player");
	vS = vP.GetComponent(Player);
	vHand = vS.vPos.gameObject;
}


function ReadInfos()
{
	vCounter = 0;
	
	for (var child : Transform in vHand.transform)
	{
		child.gameObject.SetActive (true);
		vInfos[vCounter] = child.gameObject.GetComponent(Info);
		child.gameObject.SetActive (false);
		vCounter++;
	}
	
	gameObject.GetComponent(Player).SetCurr();
	vCounter = 0;
	//save here
	SaveFile(vfileName);
}
function SaveFile(fileName : String)
{
	if(File.Exists(fileName))
	{
	File.Delete(fileName);}
	var sr = File.CreateText(fileName);
	sr.WriteLine ("Pokemon Savegame");
	sr.WriteLine (vS.vMoney);
	sr.WriteLine (vP.transform.position.x);
	sr.WriteLine (vP.transform.position.y);
	sr.WriteLine (vP.transform.position.z);
	
	for (var a : Component in vInfos)
	{
		if(a != null)
		{
			//bat
			if(a.vType == 1)
			{
				sr.WriteLine ("1");
			}
			//ball
			if(a.vType == 2)
			{
				sr.WriteLine ("2");
				//content
				if(a.gameObject.GetComponent(Pokeball).vContent != null)
				{
					//full ball, write 1
					print("full ball, writing");
					sr.WriteLine ("1");
					var ball = a.gameObject.GetComponent(Pokeball);
					vTint = ball.vContent.GetComponent(Pokeman).vType;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vLvl;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vExpLeft;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vHits;
					sr.WriteLine (vTint);
					
					vTfl = ball.vContent.GetComponent(Pokeman).vMoveSpeed;
					sr.WriteLine (vTfl);
					
					vTint = ball.vContent.GetComponent(Pokeman).vRange;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vChill;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vMaxHP;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vHP;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vStr;
					sr.WriteLine (vTint);
					
					vTint = ball.vContent.GetComponent(Pokeman).vCountdown;
					sr.WriteLine (vTint);
					
					
					
					vTfl = ball.vContent.transform.localScale.x;
					sr.WriteLine (vTfl);
					
					vTfl = ball.vContent.transform.localScale.y;
					sr.WriteLine (vTfl);
					
					vTfl = ball.vContent.transform.localScale.z;
					sr.WriteLine (vTfl);
				}
				else
				{
					//empty ball, write 0
					sr.WriteLine ("0");
				}
			}
			//medipack
			if(a.vType == 3)
			{
				sr.WriteLine ("3");
			}
			//pokedex
			if(a.vType == 4)
			{
				sr.WriteLine ("4");
			}
			
			
		}
	}
	sr.Close();
}

function ReadFile(file : String)
{
	if(File.Exists(file))
	{
		
		vS.ClearInv();
		vCounter = 0;
		var sr2 = File.OpenText(file);
		//read the header
		var line = sr2.ReadLine();
		print("Header:" + line);
		//read money
		line = sr2.ReadLine();
		vS.vMoney = int.Parse(line);
		print("moni:" + line);
		//read position
		line = sr2.ReadLine();
		vP.transform.position.x = float.Parse(line);
		line = sr2.ReadLine();
		vP.transform.position.y = float.Parse(line);
		line = sr2.ReadLine();
		vP.transform.position.z = float.Parse(line);
		print("last pos:" + line);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		Rd(sr2);
		vS.SetCurr();
	} 
	else 
	{
		return;
	}
}

function Rd(sr2 : StreamReader)
{
	//read next item
	
	line = sr2.ReadLine();
	var o : GameObject;
	//if bat
	if(line != null)
	{
	print("item index:" + line);
	if(int.Parse(line) == 1)
	{
		print("bat found");
		o = Instantiate(vItems[0], vHand.transform.position, vHand.transform.rotation);
		o.SendMessage ("OnHit");
	}
	// medipack
	else if(int.Parse(line) == 3)
	{
		print("medi found");
		o = Instantiate(vItems[2], vHand.transform.position, vHand.transform.rotation);
		o.SendMessage ("OnHit");
	}
	// pokedex
	else if(int.Parse(line) == 4)
	{
		print("medi found");
		o = Instantiate(vItems[3], vHand.transform.position, vHand.transform.rotation);
		o.SendMessage ("OnHit");
	}
	// pokeball
	else if(int.Parse(line) == 2)
	{
		line = sr2.ReadLine();
		if(line != null){
		if(int.Parse(line) == 0)
		{
			//ball empty
			print("pokeball found");
			o = Instantiate(vItems[1], vHand.transform.position, vHand.transform.rotation);
			o.SendMessage ("OnHit");
		}
		else
		{
			//ball full
			print("full pokeball found!");
			print("ball found:" + line);
			o = Instantiate(vItems[1], vHand.transform.position, vHand.transform.rotation);
			o.SendMessage ("OnHit");
			var vBs = o.GetComponent(Pokeball);
			var vPs : Component;
			//check pokemon type
			line = sr2.ReadLine();
			//croc
			if(int.Parse(line) == 1)
			{
				vBs.vContent = Instantiate(vItems[4], vHand.transform.position, vHand.transform.rotation);
				vPs = vBs.vContent.GetComponent(Pokeman);
				vPs.vOwned = 1;
				
				
				line = sr2.ReadLine();
				vPs.vLvl = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vExpLeft = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vHits = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vMoveSpeed = float.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vRange = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vChill = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vMaxHP = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vHP = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vStr = int.Parse(line);
				
				line = sr2.ReadLine();
				vPs.vCountdown = int.Parse(line);
				vPs.Ball(o);
				line = sr2.ReadLine();
				vBs.vContent.transform.localScale.x = float.Parse(line);
				line = sr2.ReadLine();
				vBs.vContent.transform.localScale.y = float.Parse(line);
				line = sr2.ReadLine();
				vBs.vContent.transform.localScale.z = float.Parse(line);
				
				
			}
			//dog
			else if(int.Parse(line) == 2)
			{
			print("dog found:" + line);
				vBs.vContent = Instantiate(vItems[5], vHand.transform.position, vHand.transform.rotation);
				vPs = vBs.vContent.GetComponent(Pokeman);
				vPs.vOwned = 1;
				
				
				line = sr2.ReadLine();
				vPs.vLvl = int.Parse(line);
				print("lvl:" + line);
				
				line = sr2.ReadLine();
				vPs.vExpLeft = int.Parse(line);
				print("vExpLeft:" + line);
				
				line = sr2.ReadLine();
				vPs.vHits = int.Parse(line);
				print("hit:" + line);
				
				line = sr2.ReadLine();
				vPs.vMoveSpeed = float.Parse(line);
				print("move:" + line);
				
				line = sr2.ReadLine();
				vPs.vRange = int.Parse(line);
				print("range:" + line);
				
				line = sr2.ReadLine();
				vPs.vChill = int.Parse(line);
				print("chill:" + line);
				
				line = sr2.ReadLine();
				vPs.vMaxHP = int.Parse(line);
				print("mhp:" + line);
				
				line = sr2.ReadLine();
				vPs.vHP = int.Parse(line);
				print("hp:" + line);
				
				line = sr2.ReadLine();
				vPs.vStr = int.Parse(line);
				print("str:" + line);
				
				line = sr2.ReadLine();
				vPs.vCountdown = int.Parse(line);
				print("cnt:" + line);
				vPs.Ball(o);
				line = sr2.ReadLine();
				vBs.vContent.transform.localScale.x = float.Parse(line);
				line = sr2.ReadLine();
				vBs.vContent.transform.localScale.y = float.Parse(line);
				line = sr2.ReadLine();
				vBs.vContent.transform.localScale.z = float.Parse(line);
				
				
			}
		
		
		}
		}
	}
	}
	
}
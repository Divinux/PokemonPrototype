//class that handles a single pokemon
var vName : String;
var vAnimO : GameObject;
var vAnim : Component;

//out of fight data
var vOwned : int = 0;
var vLvl : int = 1;
//1-croc, 2-dog
var vType : int;
var vExpBase : int = 10;
var vExpLeft : int;
var vMod : float = 1.15;

var vHits : int = 0;

var vMoveSpeed : float = 1.0f;
var vStopDist : int = 3;
var vRange : int = 200;
var vChill : int = 200;
//in fight data
var vMaxHP : int = 10;
var vHP : int = 10;
var vStr : int = 1;
var vCountdown : int = 100;
var vCountCurr : int = 100;



//references to other gameobjects
//target
var vT : GameObject;
//attacker target
var vA : GameObject;
//player object
var vP : GameObject;
//player script
var vS : Component;
//text Object and prefab
//Reference
var vDt : GameObject;
//Red Text
var vDp : GameObject;
//Green Text
var vHep : GameObject;

var vRng : int;

function Awake () 
{
	vExpLeft = vExpBase;
	vP = GameObject.FindWithTag ("Player");
	vAnim = vAnimO.GetComponent(Animation);
	R(1,100);
	vRange += vRng;
	R(1, 100);
	vChill += vRng;
}

function Update () 
{
	if(vT != null)
	{
		Move(vT);
	}
	else
	{
		if(vOwned == 0){
		Roam();
		}
		else
		{
			vT = vP;
		}
	}
}

function Move(i : GameObject)
{
	transform.LookAt(i.transform);
	transform.rotation.x = 0;
	transform.rotation.z = 0;
	if(Vector3.Distance(i.transform.position, transform.position) >= vStopDist)
	{
		//print(Vector3.Distance(i.transform.position, transform.position));
		vAnim.CrossFade("Running");
		transform.Translate(Vector3.forward * vMoveSpeed * Time.deltaTime, Space.Self);
	}
	else if(i.tag == "Pokemon")
	{
		Attack(i);
	}
	else if(vA != null)
	{
		AttackP();
	}
	else
	{
		vAnim.CrossFade("idle");
	}

}

function Roam()
{
	
	
	if(vRange <= 0)
	{
		vAnim.CrossFade("idle");
		
		vChill--;
		if(vChill <= 0)
		{
		vAnim.CrossFade("idle");
		vRange = 50;
		vChill = 100;
		transform.eulerAngles.y = Random.Range(1, 359);
		}
	}
	else
	{
		vAnim.CrossFade("Running");
		vRange--;
	transform.Translate(Vector3.forward * vMoveSpeed/3 * Time.deltaTime, Space.Self);
	}
}

//defend against pokemon
function Attack(e : GameObject)
{
	vCountCurr--;
	
	if(vCountCurr <= 0)
	{
		vAnim.CrossFade("attack");
		//print("attack");
		DelayedDmg(e);
		e.GetComponent(Pokeman).vT = gameObject;
		e.GetComponent(Pokeman).vA = gameObject;

		vCountCurr = vCountdown;
		vHits++;
	}
	else
	{
	if (!vAnim.isPlaying){
        vAnim.CrossFade("idle");}

	}

	if(e.activeSelf == false || e == null)
	{
	
	if(vOwned == 0){
		vT = null;
		vA = null;
		}
		else
		{
		vT = vP;
		}
	}
}

function DelayedDmg(f : GameObject)
{
yield WaitForSeconds(0.5);
if(f != null){
f.SendMessage ("Dmg", vStr);
}
		
}

//defend against player
function AttackP()
{	
	if(vA.tag == "Player")
	{
		vCountCurr--;
		if(vCountCurr <= 0)
		{
			vAnim.CrossFade("attack");
			vA.SendMessage ("Dmg", vStr);

			vCountCurr = vCountdown;
			vHits++;
		}
		else
	{
	if (!vAnim.isPlaying){
        vAnim.CrossFade("idle");}

	}
	}
}

function Ball(b : GameObject)
{
	if (vOwned == 0)
	{
		if(vHP <= vMaxHP/2)
		{
		//print("catch!");
		transform.rigidbody.isKinematic = true;
		transform.parent = b.transform;
		transform.position = b.transform.position;
		transform.rotation = b.transform.rotation;
		vOwned = 1;
		vT = null;
		vA = null;
		b.GetComponent(Pokeball).vContent = gameObject;
		b.renderer.material.mainTexture = b.GetComponent(Pokeball).vLit;
		gameObject.SetActive(false);
		}
	}
	else if (vOwned == 1)
	{
		//print("return!");
		transform.rigidbody.isKinematic = true;
		transform.parent = b.transform;
		transform.position = b.transform.position;
		transform.rotation = b.transform.rotation;
		b.GetComponent(Pokeball).vContent = gameObject;
		b.renderer.material.mainTexture = b.GetComponent(Pokeball).vLit;
		
		
		
		gainExp();
		vT = null;
		vA = null;
		gameObject.SetActive(false);
	}
}

function Dmg(i : int)
{
	vHP -= i;
	vDt = Instantiate(vDp, transform.position, transform.rotation);
	vDt.GetComponent(DmgText).vText = "" + i;
	
	if(vHP <= 0)
	{
		if(vOwned == 0){
		transform.parent.GetComponent(PokePool).Spawn();
		}
		if(vA.tag == "Pokemon")
		{
		vA.GetComponent(Pokeman).bonusExp(vLvl);
		vP.GetComponent(Player).vMoney += vLvl;
		//print("Bonus given:" + vLvl);
		}
		Destroy(gameObject);
	}
}

function Heal(i : int)
{
	vHP += i;
	
	vDt = Instantiate(vHep, transform.position, transform.rotation);
	vDt.GetComponent(DmgText).vText = "" + i;
	
	if(vHP > vMaxHP)
	{
		vHP = vMaxHP;
	}
}


function R(a : int, b : int)
{
	vRng = Random.Range(a, b);
}

function bonusExp(ex : int)
{

}

function gainExp()
{
	if(vHits <= vExpLeft)
	{
		vExpLeft -= vHits;
		vHits = 0;
	}
	else
	{
		vHits -= vExpLeft;
		LvlUp();
	}
}

function LvlUp()
{
	vDt = Instantiate(vHep, transform.position, transform.rotation);
	vDt.GetComponent(DmgText).vText = "Level Up!";
	transform.localScale *= 1.03;
	
	vMoveSpeed *= 1.01;
	if(vMoveSpeed >= 12)
	{
	vMoveSpeed = 11;
	}
	vChill *= 1.01;
	
	vMaxHP *= 1.1;
	vHP = vMaxHP;
	//-this is way too fast: vStr = vStr + vLvl;
	vStr += vLvl/3;
	vCountdown *= 0.99;
	if(vCountdown <= 10)
	{
		vCountdown = 10;
	}
	vCountCurr = vCountdown;
	var t = Mathf.Pow(vMod, vLvl);
	vExpLeft = vExpBase * t;
	vLvl++;
	gainExp();
}
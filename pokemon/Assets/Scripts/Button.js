var vPrice : int;
var vIpos : GameObject;
//prefab
var vP : GameObject;

//text Object and prefab
var vDt : GameObject;
var vDp : GameObject;

//player
var vPlayer : GameObject;
var vS : Component;

function Awake () 
{
vPlayer = GameObject.FindWithTag ("Player");
	vS = vPlayer.GetComponent(Player);

}

function OnHit () 
{
	if(vS.vMoney >= vPrice)
	{
	vS.vMoney -= vPrice;
	Instantiate(vP, vIpos.transform.position, vIpos.transform.rotation);
	
	vDt = Instantiate(vDp, transform.position, transform.rotation);
	vDt.GetComponent(DmgText).vText = "" + vPrice;
	}
}
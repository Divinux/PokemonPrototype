var v : int = 10;

function Start () {

}

function Update () 
{
	if(v > 0)
	{
		v--;
	}
	else
	{
		transform.rotation.z = 0;
		v = 10;
	}
}
var Goal : GameObject;

function OnTriggerEnter (other : Collider) 
{
    if(other.gameObject.tag == "Player")
	{
	 if(other.gameObject.GetComponent(Player).vDoorTimer <= 0)
	{
		print("Door found player");
		other.gameObject.GetComponent(Player).vDoorTimer = 15;
		other.gameObject.transform.position = Goal.transform.position;
		other.gameObject.transform.rotation.y = Goal.transform.rotation.y;
	}
	}
}
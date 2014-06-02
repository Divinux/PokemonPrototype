var vTimer : int = 100;
var vText : String;

var vTO : GameObject;
var vP : GameObject;

function Awake () 
{
	vP = GameObject.FindWithTag ("Player");
}

function Update () 
{
vTO.GetComponent(TextMesh).text = vText;
	transform.LookAt(vP.transform);
	transform.Translate(Vector3.up * Time.deltaTime);
	transform.rotation.x = 0;
	transform.rotation.z = 0;
	vTimer--;
	if(vTimer <= 0)
	{
	Destroy(gameObject);
	}
}
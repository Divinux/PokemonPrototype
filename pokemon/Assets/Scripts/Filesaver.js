import System;
import System.IO;

var  fileName = "save.txt";

function SaveFile(fileName : String)
{

	var sr = File.CreateText(fileName);
	sr.WriteLine ("Pokemon Savegame");
	sr.Close();
}

function ReadFile(file : String)
{
	if(File.Exists(file))
	{
		var sr = File.OpenText(file);
		var line = sr.ReadLine();
		while(line != null)
		{
			Debug.Log(line); // prints each line of the file
			line = sr.ReadLine();
		}   
	} 
	else 
	{
		Debug.Log("No savegame exists");
		return;
	}
}
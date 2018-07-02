using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Vozaci
	{
		public static Dictionary<string, Korisnik> vozaci { get; set; } = new Dictionary<string, Korisnik>();

		public Vozaci() { }

		public Vozaci(string path)
		{
			FileStream stream = new FileStream(path, FileMode.Open);
			StreamReader sr = new StreamReader(stream);
			Polovi pol;
			Uloge uloga;
			string line = "";

			while ((line = sr.ReadLine()) != null)
			{
				string[] tokens = line.Split('|');
				if (tokens[4].Equals("M"))
				{
					pol = Polovi.M;
				}
				else
				{
					pol = Polovi.Z;
				}
				if (tokens[8].Equals("Musterija"))
				{
					uloga = Uloge.Musterija;
				}
				else if (tokens[8].Equals("Dispecer"))
				{
					uloga = Uloge.Dispecer;
				}
				else
				{
					uloga = Uloge.Vozac;
				}

				//Vozac v = new Vozac(tokens[0], tokens[1], tokens[2], tokens[3], pol, tokens[5], tokens[6], tokens[7], uloga, tokens[9], tokens[10]);
				//vozaci.Add(v.KorisnickoIme, v);
			}

			sr.Close();
			stream.Close();
		}
	}
}
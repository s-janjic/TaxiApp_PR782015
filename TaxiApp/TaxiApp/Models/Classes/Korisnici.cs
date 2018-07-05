using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Hosting;

namespace TaxiApp.Models.Classes
{
	public class Korisnici
	{
		// class that reads registered users from file and add them to dic.
		public static Dictionary<int, Korisnik> korisnici { get; set; } = new Dictionary<int, Korisnik>();

		public Korisnici() { }

		public Korisnici(string path)
		{
			FileStream stream = new FileStream(path, FileMode.Open);
			StreamReader sr = new StreamReader(stream);
			Polovi pol;
			Uloge uloga;
			string line = "";

			while ((line = sr.ReadLine()) != null)
			{
				string[] tokens = line.Split('|');
				if (tokens[5].Equals("M"))
				{
					pol = Polovi.M;
				}
				else
				{
					pol = Polovi.Z;
				}
				if (tokens[9].Equals("Musterija"))
				{
					uloga = Uloge.Musterija;
				}
				else if (tokens[9].Equals("Dispecer"))
				{
					uloga = Uloge.Dispecer;
				}
				else
				{
					uloga = Uloge.Vozac;
				}

				Korisnik k = new Korisnik(Int32.Parse(tokens[0]), tokens[1], tokens[2], tokens[3], tokens[4], pol, tokens[6], tokens[7], tokens[8], uloga);
				korisnici.Add(k.Id, k);
			}

			sr.Close();
			stream.Close();
		}
	}
}
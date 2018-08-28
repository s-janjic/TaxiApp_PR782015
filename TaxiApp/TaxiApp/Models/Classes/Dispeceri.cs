using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace TaxiApp.Models.Classes
{
	public class Dispeceri
	{
		public static Dictionary<int, Dispecer> dispeceri { get; set; } = new Dictionary<int, Dispecer>();

		public Dispeceri() { }

		public Dispeceri(string path)
		{
			path = HostingEnvironment.MapPath(path);
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
				Dispecer d = new Dispecer(Int32.Parse(tokens[0]), tokens[1], tokens[2], tokens[3], tokens[4], pol, tokens[6], tokens[7], tokens[8], uloga);
				dispeceri.Add(d.Id, d);
			}

			sr.Close();
			stream.Close();
		}
	}
}
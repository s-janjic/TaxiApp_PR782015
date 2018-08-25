using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Vozaci
	{
		public static Dictionary<int, Vozac> vozaci { get; set; } = new Dictionary<int, Vozac>();

		public Vozaci() { }
		
		public Vozaci(string path)
		{
			FileStream stream = new FileStream(path, FileMode.Open);
			StreamReader sr = new StreamReader(stream);
			Polovi pol;
			Uloge uloga;
			TipoviAutomobila tipAuta;
			Lokacija lokacija;
			Automobil automobil;
			Adresa adresa;

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

				if (tokens[21].Equals("Putnicki"))
				{
					tipAuta = TipoviAutomobila.Putnicki;
				}
				else
				{
					tipAuta = TipoviAutomobila.Kombi;
				}

				adresa = new Adresa(Int32.Parse(tokens[13]), tokens[14], tokens[15], tokens[16]);
				lokacija = new Lokacija(Int32.Parse(tokens[10]), Double.Parse(tokens[11]), Double.Parse(tokens[12]), adresa);
				automobil = new Automobil(Int32.Parse(tokens[17]), Int32.Parse(tokens[18]), tokens[19], Int32.Parse(tokens[20]), tipAuta);

				Vozac v = new Vozac(Int32.Parse(tokens[0]), tokens[1], tokens[2], tokens[3], tokens[4], pol, tokens[6], tokens[7], tokens[8], uloga, lokacija, automobil, bool.Parse(tokens[22]), bool.Parse(tokens[23]));
				vozaci.Add(v.Id, v);
			}

			sr.Close();
			stream.Close();
		}
	}
}
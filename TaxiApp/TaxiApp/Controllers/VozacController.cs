using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiApp.Models.Classes;
// string[] idCount = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt");
namespace TaxiApp.Controllers
{
    public class VozacController : ApiController
    {
		// POST api/Vozac
		public bool Post([FromBody]Vozac vozac)
		{
			foreach (Vozac v in Vozaci.vozaci.Values)
			{
				if (v.KorisnickoIme == vozac.KorisnickoIme)
				{
					return false; // if username already exists
				}
			}

			foreach (Korisnik k in Korisnici.korisnici.Values)
			{
				if (k.KorisnickoIme == vozac.KorisnickoIme)
				{
					return false; // if username already exists
				}
			}

			foreach (Dispecer d in Dispeceri.dispeceri.Values)
			{
				if (d.KorisnickoIme == vozac.KorisnickoIme)
				{
					return false; // if username already exists
				}
			}

			string[] idCount = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt");

			Vozaci.vozaci = new Dictionary<int, Vozac>();
			vozac.Id = idCount.Length + 1;
			vozac.Uloga = Uloge.Vozac;
			vozac.Automobil.IdVozac = vozac.Id;
			vozac.Zauzet = false;
			Vozaci.vozaci.Add(vozac.Id, vozac);
			UpisTxt(vozac);
			return true;
		}

		private void UpisTxt(Vozac vozac)
		{
			FileStream stream = new FileStream(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt", FileMode.Append);
			using (StreamWriter tw = new StreamWriter(stream))
			{
				string upis = vozac.Id.ToString() + '|' + vozac.KorisnickoIme + '|' + vozac.Lozinka + '|' + vozac.Ime + '|' + vozac.Prezime + '|' + vozac.Pol + '|' + vozac.JMBG + '|' + vozac.KontaktTelefon + '|' + vozac.Email + '|' + vozac.Uloga + '|' + vozac.Lokacija.IdLok.ToString() + '|' + vozac.Lokacija.X.ToString() + '|' + vozac.Lokacija.Y.ToString() + '|' + vozac.Lokacija.Adresa.IdAdr.ToString() + '|' + vozac.Lokacija.Adresa.UlicaIBroj + '|' + vozac.Lokacija.Adresa.NaseljenoMesto + '|' + vozac.Lokacija.Adresa.PozivniBroj + '|' + vozac.Automobil.IdVozac.ToString() + '|' + vozac.Automobil.Godiste.ToString() + '|' + vozac.Automobil.Registracija + '|' + vozac.Automobil.BrojVozila.ToString() + '|' + vozac.Automobil.TipAuta + '|' + vozac.Zauzet.ToString();
				tw.WriteLine(upis);
			}
			stream.Close();
		}

		// PUT api/Vozac/1
		public bool Put(int id, [FromBody]Vozac vozac)
		{
			foreach (Vozac v in Vozaci.vozaci.Values)
			{
				if (v.Id == id)
				{
					Vozaci.vozaci.Remove(v.Id);
					Vozaci.vozaci.Add(vozac.Id, vozac);
					UpisTxtIzmena(vozac);
					return true;
				}
			}
			return false;
		}

		private void UpisTxtIzmena(Vozac vozac)
		{
			string[] lines = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt");
			string allString = "";

			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Split('|')[1].Equals(vozac.KorisnickoIme.ToString()))
				{
					allString += vozac.Id.ToString() + '|' + vozac.KorisnickoIme + '|' + vozac.Lozinka + '|' + vozac.Ime + '|' + vozac.Prezime + '|' + vozac.Pol + '|' + vozac.JMBG + '|' + vozac.KontaktTelefon + '|' + vozac.Email + '|' + vozac.Uloga + '|' + vozac.Lokacija.IdLok.ToString() + '|' + vozac.Lokacija.X.ToString() + '|' + vozac.Lokacija.Y.ToString() + '|' + vozac.Lokacija.Adresa.IdAdr.ToString() + '|' + vozac.Lokacija.Adresa.UlicaIBroj + '|' + vozac.Lokacija.Adresa.NaseljenoMesto + '|' + vozac.Lokacija.Adresa.PozivniBroj + '|' + vozac.Automobil.IdVozac.ToString() + '|' + vozac.Automobil.Godiste.ToString() + '|' + vozac.Automobil.Registracija + '|' + vozac.Automobil.BrojVozila.ToString() + '|' + vozac.Automobil.TipAuta + '|' + vozac.Zauzet.ToString();
					lines[i] = allString;
				}
			}

			File.WriteAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt", lines);
		}
	}
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiApp.Models.Classes;

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

			string[] idCount = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt");

			Vozaci.vozaci = new Dictionary<int, Korisnik>();
			vozac.Id = idCount.Length + 1;
			vozac.Uloga = Uloge.Vozac;
			vozac.Automobil.IdVozac = vozac.Id;
			Vozaci.vozaci.Add(vozac.Id, vozac);
			UpisTxt(vozac);
			return true;
		}

		private void UpisTxt(Vozac vozac)
		{
			FileStream stream = new FileStream(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Korisnici.txt", FileMode.Append);
			using (StreamWriter tw = new StreamWriter(stream))
			{
				string upis = vozac.Id.ToString() + '|' + vozac.KorisnickoIme + '|' + vozac.Lozinka + '|' + vozac.Ime + '|' + vozac.Prezime + '|' + vozac.Pol + '|' + vozac.JMBG + '|' + vozac.KontaktTelefon + '|' + vozac.Email + '|' + vozac.Uloga + '|' + vozac.Lokacija.Id.ToString() + '|' + vozac.Lokacija.X.ToString() + '|' + vozac.Lokacija.Y.ToString() + '|' + vozac.Lokacija.Adresa.Id.ToString() + '|' + vozac.Lokacija.Adresa.UlicaIBroj + '|' + vozac.Lokacija.Adresa.NaseljenoMesto + '|' + vozac.Lokacija.Adresa.PozivniBroj + '|' + vozac.Automobil.IdVozac.ToString() + '|' + vozac.Automobil.GodisteVozila.ToString() + '|' + vozac.Automobil.Registracija + '|' + vozac.Automobil.BrojVozila.ToString() + '|' + vozac.Automobil.TipAuta;
				tw.WriteLine(upis);
			}
			stream.Close();
		}
	}
}

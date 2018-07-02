using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TaxiApp.Models.Classes;

namespace TaxiApp.Controllers
{
	public class RegistrationController : ApiController
	{
		public bool Post([FromBody]Korisnik korisnik)
		{
			foreach (Korisnik kor in Korisnici.korisnici.Values)
			{
				if (kor.KorisnickoIme == korisnik.KorisnickoIme)
				{
					return false;
				}
			}

			Korisnici.korisnici = new Dictionary<string, Korisnik>();
			korisnik.Uloga = Uloge.Musterija;
			Korisnici.korisnici.Add(korisnik.KorisnickoIme, korisnik);
			HttpContext.Current.Application["korisnici"] = Korisnici.korisnici;
			UpisTxt(korisnik);
			return true;
		}

		private void UpisTxt(Korisnik k)
		{
			FileStream stream = new FileStream(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Korisnici.txt", FileMode.Append);
			using (StreamWriter tw = new StreamWriter(stream))
			{
				string upis = k.KorisnickoIme + '|' + k.Lozinka + '|' + k.Ime + '|' + k.Prezime + '|' + k.Pol + '|' + k.JMBG + '|' + k.KontaktTelefon + '|' + k.Email + '|' + k.Uloga;
				tw.WriteLine(upis);
			}
			stream.Close();
		}
	}
}

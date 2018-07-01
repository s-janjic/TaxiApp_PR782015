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
		bool exist = false;
		public void Post([FromBody]Korisnik korisnik)
		{
			var korisnici2 = Korisnici.korisnici;
			HttpContext.Current.Application["korisnici"] = korisnici2;
			var korisnici3 = HttpContext.Current.Application["korisnici"] as Dictionary<string, Korisnik>;

			if (korisnici3 != null)
			{
				foreach (Korisnik kor in korisnici3.Values)
				{
					if (kor.KorisnickoIme == korisnik.KorisnickoIme)
					{
						exist = true;
						break;
					}
				}
			}

			if (!exist)
			{
				korisnici3 = new Dictionary<string, Korisnik>();
				korisnik.Uloga = Uloge.Musterija;
				korisnici3.Add(korisnik.KorisnickoIme, korisnik);
				HttpContext.Current.Application["korisnici"] = korisnici3;
				UpisTxt(korisnik);
			}
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

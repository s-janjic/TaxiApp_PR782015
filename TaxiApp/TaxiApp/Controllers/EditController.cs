using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiApp.Models.Classes;
using System.IO;

namespace TaxiApp.Controllers
{
    public class EditController : ApiController
    {
		// edit controller allows user to change private info
		public bool Post([FromBody]Korisnik korisnik)
		{
			if(korisnik.Uloga == Uloge.Musterija)
			{
				foreach (Korisnik kor in Korisnici.korisnici.Values)
				{
					if (kor.KorisnickoIme == korisnik.KorisnickoIme)
					{
						Korisnici.korisnici.Remove(kor.KorisnickoIme);              // remove old user with info
						Korisnici.korisnici.Add(kor.KorisnickoIme, korisnik);       // add same user with changed info
						UpisiIzmenuTxt(korisnik);
						return true;			// true if success
					}
				}
				return false;           // if fail, false
			}
			else if (korisnik.Uloga == Uloge.Dispecer)
			{
				foreach (Dispecer disp in Dispeceri.dispeceri.Values)
				{
					if(disp.KorisnickoIme == korisnik.KorisnickoIme)
					{
						Dispeceri.dispeceri.Remove(disp.KorisnickoIme);
						Dispecer d = new Dispecer(korisnik.KorisnickoIme, korisnik.Lozinka, korisnik.Ime, korisnik.Prezime, korisnik.Pol, korisnik.JMBG, korisnik.KontaktTelefon, korisnik.Email, korisnik.Uloga);
						Dispeceri.dispeceri.Add(disp.KorisnickoIme, d);
						UpisiIzmenuDispTxt(korisnik);
						return true;            // true if success
					}
				}
				return false;           // if fail, false
			}
			else  // vozac
			{
				return false;			// if fail, false
			}
		}

		private void UpisiIzmenuTxt(Korisnik korisnik)
		{
			string[] lines = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Korisnici.txt");
			string newStr = "";

			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Contains(korisnik.KorisnickoIme.ToString()))
				{
					newStr += korisnik.KorisnickoIme + '|' + korisnik.Lozinka + '|' + korisnik.Ime + '|' + korisnik.Prezime + '|' + korisnik.Pol + '|' + korisnik.JMBG + '|' + korisnik.KontaktTelefon + '|' + korisnik.Email + '|' + korisnik.Uloga;
					lines[i] = newStr; // preko starog, prelepimo novi
				}
			}

			File.WriteAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Korisnici.txt", lines);
		}

		private void UpisiIzmenuDispTxt(Korisnik korisnik)
		{
			string[] lines = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Dispeceri.txt");
			string newStr = "";

			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Contains(korisnik.KorisnickoIme.ToString()))
				{
					newStr += korisnik.KorisnickoIme + '|' + korisnik.Lozinka + '|' + korisnik.Ime + '|' + korisnik.Prezime + '|' + korisnik.Pol + '|' + korisnik.JMBG + '|' + korisnik.KontaktTelefon + '|' + korisnik.Email + '|' + korisnik.Uloga;
					lines[i] = newStr; // preko starog, prelepimo novi
				}
			}

			File.WriteAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Dispeceri.txt", lines);
		}
	}
}

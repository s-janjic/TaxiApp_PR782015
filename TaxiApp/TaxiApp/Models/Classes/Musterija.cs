using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Musterija : Korisnik
	{
		public Musterija()
		{

		}

		public Musterija(string korisnickoIme, string lozinka, string ime, string prezime, string pol, string jmbg, string kontaktTelefon, string email)
		{
			KorisnickoIme = korisnickoIme;
			Lozinka = lozinka;
			Ime = ime;
			Prezime = prezime;
			if (pol.Equals("m"))
				Pol = Polovi.MUSKI;
			else
				Pol = Polovi.ZENSKI;
			Jmbg = jmbg;
			KontaktTelefon = kontaktTelefon;
			Email = email;
			Uloga = Uloge.MUSTERIJA;
		}
	}
}
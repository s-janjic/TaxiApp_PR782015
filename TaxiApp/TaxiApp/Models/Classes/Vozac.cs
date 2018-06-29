using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Vozac : Korisnik
	{
		Lokacija lokacija;
		Automobil automobil;

		public Vozac()
		{

		}

		public Vozac(string korisnickoIme, string lozinka, string ime, string prezime, string pol, string jmbg, string kontaktTelefon, string email, Automobil auto)
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
			Uloga = Uloge.VOZAC;
			this.Lokacija = new Lokacija();
			this.Automobil = auto;
		}

		public Lokacija Lokacija { get => lokacija; set => lokacija = value; }
		public Automobil Automobil { get => automobil; set => automobil = value; }
	}
}
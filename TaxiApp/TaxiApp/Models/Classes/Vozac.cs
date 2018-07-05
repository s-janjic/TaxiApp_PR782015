using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Vozac : Korisnik
	{
		public Vozac()
		{
		}

		public Lokacija Lokacija { get; set; }
		public Automobil Automobil { get; set; }

		public Vozac(int id, string k, string l, string ime, string p, Polovi po, string jmbg, string kont, string email, Uloge ul, Lokacija lokacija, Automobil automobil)
		{
			this.Id = id;
			this.KorisnickoIme = k;
			this.Lozinka = l;
			this.Ime = ime;
			this.Prezime = p;
			if (po.ToString().Equals("M"))
			{
				this.Pol = Polovi.M;
			}
			else
			{
				this.Pol = Polovi.Z;
			}
			this.JMBG = jmbg;
			this.KontaktTelefon = kont;
			this.Email = email;

			if (ul.ToString().Equals("Musterija"))
			{
				this.Uloga = Uloge.Musterija;
			}
			else if (ul.ToString().Equals("Dispecer"))
			{
				this.Uloga = Uloge.Dispecer;
			}
			else
			{
				this.Uloga = Uloge.Vozac;
			}

			this.Lokacija = lokacija;
			this.Automobil = automobil;
		}
	}
}
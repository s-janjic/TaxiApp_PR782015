using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Korisnik
	{
		public string KorisnickoIme { get; set; }
		public string Lozinka { get; set; }
		public string Ime { get; set; }
		public string Prezime { get; set; }
		public Polovi Pol { get; set; }
		public string JMBG { get; set; }
		public string KontaktTelefon { get; set; }
		public string Email { get; set; }
		public Uloge Uloga { get; set; }

		public Korisnik()
		{
		}

		public Korisnik(string k, string l, string ime, string p, Polovi po, string jmbg, string kont, string ema, Uloge ul)
		{
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
			this.Email = ema;

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
		}
	}
}
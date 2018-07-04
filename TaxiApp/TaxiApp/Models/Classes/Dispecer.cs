using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Dispecer : Korisnik
	{
		public Dispecer()
		{

		}

		public Dispecer(string k, string l, string ime, string p, Polovi po, string jmbg, string kont, string ema, Uloge ul)
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
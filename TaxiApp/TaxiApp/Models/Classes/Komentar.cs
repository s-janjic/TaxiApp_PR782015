using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Komentar
	{
		string opis;
		DateTime datumObjave;
		Korisnik korisnik;
		Voznja voznja;
		Ocene ocena;

		public Komentar(string opis, DateTime dateTime, Korisnik korisnik, Voznja voznja, Ocene ocene)
		{
			this.Opis = opis;
			this.DatumObjave = dateTime;
			this.Korisnik = korisnik;
			this.Voznja = voznja;
			this.Ocena = ocene;
		}

		public string Opis { get => opis; set => opis = value; }
		public DateTime DatumObjave { get => datumObjave; set => datumObjave = value; }
		public Korisnik Korisnik { get => korisnik; set => korisnik = value; }
		public Voznja Voznja { get => voznja; set => voznja = value; }
		public Ocene Ocena { get => ocena; set => ocena = value; }
	}
}
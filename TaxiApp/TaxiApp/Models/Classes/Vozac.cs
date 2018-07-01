using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Vozac
	{
		public int Id { get; set; }
		public string KorisnickoIme { get; set; }
		public string Lozinka { get; set; }
		public string Ime { get; set; }
		public string Prezime { get; set; }
		public Polovi Pol { get; set; }
		public string JMBG { get; set; }
		public string KontaktTelefon { get; set; }
		public string Email { get; set; }
		public Uloge Uloga { get; set; }
		public Lokacija Lokacija { get; set; }
		public Automobil Automobil { get; set; }
	}
}
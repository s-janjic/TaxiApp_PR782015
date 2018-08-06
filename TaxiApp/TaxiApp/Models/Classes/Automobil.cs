using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Automobil
	{
		public int IdVozac { get; set; }
		public int Godiste { get; set; }
		public string Registracija { get; set; }
		public int BrojVozila { get; set; }
		public TipoviAutomobila TipAuta { get; set; }

		public Automobil()
		{
		}

		public Automobil(int idVoz, int godiste, string reg, int brVozila, TipoviAutomobila tipoviAutomobila)
		{
			this.IdVozac = idVoz;
			this.Godiste = godiste;
			this.Registracija = reg;
			this.BrojVozila = brVozila;
			if (tipoviAutomobila.ToString().Equals("Kombi"))
			{
				this.TipAuta = TipoviAutomobila.Kombi;
			}
			else
			{
				this.TipAuta = TipoviAutomobila.Putnicki;
			}
		}
	}
}
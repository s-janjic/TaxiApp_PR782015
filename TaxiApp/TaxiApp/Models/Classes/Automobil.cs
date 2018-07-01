using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Automobil
	{
		public Vozac Vozac { get; set; }
		public string Registracija { get; set; }
		public string BrojVozila { get; set; }
		public TipoviAutomobila TipAuta { get; set; }
	}
}
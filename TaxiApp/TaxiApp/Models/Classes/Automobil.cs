using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Automobil
	{
		string vozac;
		int godisteAutomobila;
		string brojRegistarskeOznake;
		int brojTaksiVozila; // kljuc
		TipoviAutomobila tipoviAutomobila;

		public Automobil(int brTaksiVozila, string vozac, string brRegOzn, int godVozila, TipoviAutomobila tip)
		{
			this.BrojTaksiVozila = brTaksiVozila;
			this.Vozac = vozac;
			this.BrojRegistarskeOznake = brRegOzn;
			this.GodisteAutomobila = godVozila;
			this.TipoviAutomobila = tip;
		}

		public string Vozac { get => vozac; set => vozac = value; }
		public int GodisteAutomobila { get => godisteAutomobila; set => godisteAutomobila = value; }
		public string BrojRegistarskeOznake { get => brojRegistarskeOznake; set => brojRegistarskeOznake = value; }
		public int BrojTaksiVozila { get => brojTaksiVozila; set => brojTaksiVozila = value; }
		public TipoviAutomobila TipoviAutomobila { get => tipoviAutomobila; set => tipoviAutomobila = value; }
	}
}
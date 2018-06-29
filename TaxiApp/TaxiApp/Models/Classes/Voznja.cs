using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Voznja
	{
		DateTime datumIVreme;
		Lokacija lokacija;
		TipoviAutomobila tipAutomobila;
		Musterija musterija;
		Lokacija odrediste;
		Dispecer dispecer;
		Vozac vozac;
		int cena;
		string komentar;
		StatusVoznje statusVoznje;

		public Voznja(DateTime dateTime, Lokacija lokacija, TipoviAutomobila tipoviAutomobila, Musterija musterija, Lokacija odrediste, Dispecer dispecer, Vozac vozac, int cena, string komentar)
		{
			this.DatumIVreme = dateTime;
			this.Lokacija = lokacija;
			this.TipAutomobila = tipoviAutomobila;
			this.Musterija = musterija;
			this.Odrediste = odrediste;
			this.Dispecer = dispecer;
			this.Vozac = vozac;
			this.Cena = cena;
			this.Komentar = komentar;
			this.StatusVoznje = StatusVoznje.KREIRANA_NA_CEKANJU;
		}

		public DateTime DatumIVreme { get => datumIVreme; set => datumIVreme = value; }
		public Lokacija Lokacija { get => lokacija; set => lokacija = value; }
		public TipoviAutomobila TipAutomobila { get => tipAutomobila; set => tipAutomobila = value; }
		public Musterija Musterija { get => musterija; set => musterija = value; }
		public Lokacija Odrediste { get => odrediste; set => odrediste = value; }
		public Dispecer Dispecer { get => dispecer; set => dispecer = value; }
		public Vozac Vozac { get => vozac; set => vozac = value; }
		public int Cena { get => cena; set => cena = value; }
		public string Komentar { get => komentar; set => komentar = value; }
		public StatusVoznje StatusVoznje { get => statusVoznje; set => statusVoznje = value; }
	}
}
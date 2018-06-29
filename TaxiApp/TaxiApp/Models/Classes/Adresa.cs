using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Adresa
	{
		string ulica;
		int broj;
		string grad;
		int pozivniBroj;

		public Adresa(string ulica, int broj, string grad, int pozivniBroj)
		{
			this.Ulica = ulica;
			this.Broj = broj;
			this.Grad = grad;
			this.PozivniBroj = pozivniBroj;
		}

		public string Ulica { get => ulica; set => ulica = value; }
		public int Broj { get => broj; set => broj = value; }
		public string Grad { get => grad; set => grad = value; }
		public int PozivniBroj { get => pozivniBroj; set => pozivniBroj = value; }
	}
}
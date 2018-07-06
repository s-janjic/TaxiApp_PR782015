using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Adresa
	{
		public int Id { get; set; }
		public string UlicaIBroj { get; set; }
		public string NaseljenoMesto { get; set; }
		public string PozivniBroj { get; set; }

		public Adresa()
		{
		}

		public Adresa(int id, string ulica, string mesto, string pozBr)
		{
			this.Id = id;
			this.UlicaIBroj = ulica;
			this.NaseljenoMesto = mesto;
			this.PozivniBroj = pozBr;
		}
	}
}
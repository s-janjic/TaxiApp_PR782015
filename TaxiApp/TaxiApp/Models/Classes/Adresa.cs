﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Adresa
	{
		public string UlicaIBroj { get; set; }
		public string NaseljenoMesto { get; set; }
		public string PozivniBroj { get; set; }

		public Adresa()
		{
		}

		public Adresa(string ulica, string mesto, string pozBr)
		{
			this.UlicaIBroj = ulica;
			this.NaseljenoMesto = mesto;
			this.PozivniBroj = pozBr;
		}
	}
}
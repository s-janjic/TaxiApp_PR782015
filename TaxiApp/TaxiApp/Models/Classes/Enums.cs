using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public enum Polovi
	{
		M,
		Z
	}

	public enum Uloge
	{
		Musterija,
		Vozac,
		Dispecer
	}

	public enum TipoviAutomobila
	{
		Putnicki,
		Kombi
	}

	public enum StatusVoznje
	{
		Kreirana,
		Formirana,
		Obradjena,
		Prihvacena,
		Otkazana,
		Neuspesna,
		Uspesna,
		Utoku
	}
}
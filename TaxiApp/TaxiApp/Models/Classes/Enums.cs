using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public enum Polovi
	{
		MUSKI,
		ZENSKI
	};

	public enum Uloge
	{
		MUSTERIJA,
		VOZAC,
		DISPECER
	};

	public enum TipoviAutomobila
	{
		PUTNICKI,
		KOMBI
	};

	public enum StatusVoznje
	{
		KREIRANA_NA_CEKANJU,
		OTKAZANA,
		FORMIRANA,
		OBRADJENA,
		PRIHVACENA,
		NEUSPESNA,
		USPESNA
	};

	public enum Ocene
	{
		NULA,
		JEDAN,
		DVA,
		TRI,
		CETIRI,
		PET
	};
}
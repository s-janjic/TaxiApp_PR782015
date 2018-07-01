using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Komentar
	{
		public string Opis { get; set; }
		public DateTime DTObjave { get; set; }

		public Korisnik KorisnikKomentar { get; set; }
		public Voznja VoznjaKomentar { get; set; }

		public int Ocena { get; set; }
	}
}
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
		public string KorImeKorisnikKomentar { get; set; }
		public int IdVoznjaKomentar { get; set; }
		public int Ocena { get; set; }

		public Komentar()
		{
		}

		public Komentar(string opis, DateTime datum, string korime, int idvoznje, int ocena)
		{
			this.Opis = opis;
			this.DTObjave = datum;
			this.KorImeKorisnikKomentar = korime;
			this.IdVoznjaKomentar = idvoznje;
			this.Ocena = ocena;
		}
	}
}
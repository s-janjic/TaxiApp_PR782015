using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiApp.Models.Classes;

namespace TaxiApp.Controllers
{
    public class VoznjaController : ApiController
    {
		// POST api/voznja
		public bool Post([FromBody]Voznja voznja)
		{
			if (Voznje.voznje != null)
			{
				foreach (Voznja kor in Voznje.voznje.Values)
				{
					if (kor.Dolazak.Adresa.UlicaIBroj == voznja.Dolazak.Adresa.UlicaIBroj)
					{
						return false;
					}
				}
			}

			string[] idCount = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Voznje.txt");

			Voznje.voznje = new Dictionary<int, Voznja>();
			voznja.IdVoznje = idCount.Length + 1;
			voznja.DTPorudzbine = DateTime.Now;
			voznja.Komentar = new Komentar();
			voznja.Odrediste = new Lokacija();
			Voznje.voznje.Add(voznja.IdVoznje, voznja);
			UpisTxt(voznja);
			return true;
		}

		private void UpisTxt(Voznja k)
		{
			FileStream stream = new FileStream(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Voznje.txt", FileMode.Append);
			using (StreamWriter tw = new StreamWriter(stream))
			{
				string upis = k.IdVoznje.ToString() + '|' + k.DTPorudzbine.ToString() + '|' + k.Dolazak.IdLok.ToString() + '|' + k.Dolazak.X.ToString() + '|' + k.Dolazak.Y.ToString() + '|' + k.Dolazak.Adresa.IdAdr.ToString() + '|' + k.Dolazak.Adresa.UlicaIBroj + '|' + k.Dolazak.Adresa.NaseljenoMesto + '|' + k.Dolazak.Adresa.PozivniBroj + '|' + k.TipAutaVoznje + '|' + k.MusterijaVoznja + '|' + k.Odrediste.IdLok.ToString() + '|' + k.Odrediste.X.ToString() + '|' + k.Odrediste.Y.ToString() + '|' + k.Odrediste.Adresa.IdAdr.ToString() + '|' + k.Odrediste.Adresa.UlicaIBroj + '|' + k.Odrediste.Adresa.NaseljenoMesto + '|' + k.Odrediste.Adresa.PozivniBroj + '|' + k.VozacVoznja + '|' + k.Iznos.ToString() + '|' + k.DispecerVoznja + '|' + k.Komentar.Opis + '|' + k.Komentar.DTObjave.ToString() + '|' + k.Komentar.KorImeKorisnikKomentar + '|' + k.Komentar.IdVoznjaKomentar.ToString() + '|' + k.Komentar.Ocena.ToString() + '|' + k.StatusVoznje;
				tw.WriteLine(upis);
			}
			stream.Close();
		}

		// GET api/voznja/1
		public Dictionary<int, Voznja> Get()
		{
			return Voznje.voznje;
		}
	}
}

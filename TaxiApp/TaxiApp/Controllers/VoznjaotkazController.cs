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
    public class VoznjaotkazController : ApiController
    {
		// izmena voznje za otkazivanje
		// PUT api/Voznjaotkaz/1
		public bool Put(int id, [FromBody]Voznja voznja)
		{
			foreach (Voznja vo in Voznje.voznje.Values)
			{
				if (vo.IdVoznje == id)
				{
					voznja.TipAutaVoznje = vo.TipAutaVoznje;
					voznja.IdVoznje = vo.IdVoznje;
					voznja.DTPorudzbine = vo.DTPorudzbine;
					if (voznja.MusterijaVoznja != null && voznja.VozacVoznja == null)
					{
						voznja.StatusVoznje = StatusVoznje.Otkazana;
						voznja.Dolazak = new Lokacija();
						voznja.Dolazak.IdLok = vo.Dolazak.IdLok;
						voznja.Dolazak.X = vo.Dolazak.X;
						voznja.Dolazak.Y = vo.Dolazak.Y;
						voznja.Dolazak.Adresa.IdAdr = vo.Dolazak.Adresa.IdAdr;
						voznja.Dolazak.Adresa.UlicaIBroj = vo.Dolazak.Adresa.UlicaIBroj;
						voznja.Dolazak.Adresa.NaseljenoMesto = vo.Dolazak.Adresa.NaseljenoMesto;
						voznja.Dolazak.Adresa.PozivniBroj = vo.Dolazak.Adresa.PozivniBroj;
						voznja.Odrediste = new Lokacija();
					}
					else if (voznja.DispecerVoznja != null)
					{
						voznja.StatusVoznje = StatusVoznje.Obradjena;
						foreach (Vozac v in Vozaci.vozaci.Values)
						{
							if (v.KorisnickoIme == voznja.VozacVoznja)
							{
								v.Zauzet = true;
								UpisIzmenaTxtVozac(v);
							}
							voznja.MusterijaVoznja = vo.MusterijaVoznja;
							voznja.Komentar = vo.Komentar;
							voznja.Dolazak = new Lokacija();
							voznja.Dolazak.IdLok = vo.Dolazak.IdLok;
							voznja.Dolazak.X = vo.Dolazak.X;
							voznja.Dolazak.Y = vo.Dolazak.Y;
							voznja.Dolazak.Adresa.IdAdr = vo.Dolazak.Adresa.IdAdr;
							voznja.Dolazak.Adresa.UlicaIBroj = vo.Dolazak.Adresa.UlicaIBroj;
							voznja.Dolazak.Adresa.NaseljenoMesto = vo.Dolazak.Adresa.NaseljenoMesto;
							voznja.Dolazak.Adresa.PozivniBroj = vo.Dolazak.Adresa.PozivniBroj;
							voznja.Odrediste = new Lokacija();
						}
					}
					else if (voznja.VozacVoznja != null)
					{
						voznja.StatusVoznje = StatusVoznje.Otkazana;
					}
					else
					{
						return false;
					}
					Voznje.voznje.Remove(vo.IdVoznje);
					Voznje.voznje.Add(voznja.IdVoznje, voznja);
					UpisIzmenaTxt(voznja);
					return true;
				}
			}
			return false;
		}

		// metoda za upis izmene
		private void UpisIzmenaTxt(Voznja k)
		{
			string[] lines = File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Voznje.txt");
			string allString = "";
			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Split('|')[0].Equals(k.IdVoznje.ToString()))
				{
					allString += k.IdVoznje.ToString() + '|' + k.DTPorudzbine.ToString() + '|' + k.Dolazak.IdLok.ToString() + '|' + k.Dolazak.X.ToString() + '|' + k.Dolazak.Y.ToString() + '|' + k.Dolazak.Adresa.IdAdr.ToString() + '|' + k.Dolazak.Adresa.UlicaIBroj + '|' + k.Dolazak.Adresa.NaseljenoMesto + '|' + k.Dolazak.Adresa.PozivniBroj + '|' + k.TipAutaVoznje + '|' + k.MusterijaVoznja + '|' + k.Odrediste.IdLok.ToString() + '|' + k.Odrediste.X.ToString() + '|' + k.Odrediste.Y.ToString() + '|' + k.Odrediste.Adresa.IdAdr.ToString() + '|' + k.Odrediste.Adresa.UlicaIBroj + '|' + k.Odrediste.Adresa.NaseljenoMesto + '|' + k.Odrediste.Adresa.PozivniBroj + '|' + k.VozacVoznja + '|' + k.Iznos.ToString() + '|' + k.DispecerVoznja + '|' + k.Komentar.Opis + '|' + k.Komentar.DTObjave.ToString() + '|' + k.Komentar.KorImeKorisnikKomentar + '|' + k.Komentar.IdVoznjaKomentar.ToString() + '|' + k.Komentar.Ocena.ToString() + '|' + k.StatusVoznje;
					lines[i] = allString;
				}
			}

			File.WriteAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Voznje.txt", lines);
		}

		private void UpisIzmenaTxtVozac(Vozac k)
		{
			string[] lines = System.IO.File.ReadAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt");
			string allString = "";
			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Contains(k.Id.ToString()))
				{
					allString += k.Id.ToString() + '|' + k.KorisnickoIme + '|' + k.Lozinka + '|' + k.Ime + '|' + k.Prezime + '|' + k.Pol + '|' + k.JMBG + '|' + k.KontaktTelefon + '|' + k.Email + '|' + k.Uloga + '|' + k.Lokacija.IdLok.ToString() + '|' + k.Lokacija.X.ToString() + '|' + k.Lokacija.Y.ToString() + '|' + k.Lokacija.Adresa.IdAdr.ToString() + '|' + k.Lokacija.Adresa.UlicaIBroj + '|' + k.Lokacija.Adresa.NaseljenoMesto + '|' + k.Lokacija.Adresa.PozivniBroj + '|' + k.Automobil.IdVozac.ToString() + '|' + k.Automobil.Godiste + '|' + k.Automobil.Registracija + '|' + k.Automobil.BrojVozila.ToString() + '|' + k.Automobil.TipAuta + '|' + k.Zauzet.ToString();
					lines[i] = allString;
				}
			}
			System.IO.File.WriteAllLines(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt", lines);

		}
	}
}

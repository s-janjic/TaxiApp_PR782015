using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiApp.Models.Classes;
using System.Web.Hosting;

namespace TaxiApp.Controllers
{
    public class VoznjaController : ApiController
    {
		// dodavanje nove voznje
		// POST api/voznja
		public bool Post([FromBody]Voznja voznja)
		{
			if (Voznje.voznje != null)
			{
				//foreach (Voznja kor in Voznje.voznje.Values)
				//{
				//	if (kor.Dolazak.Adresa.UlicaIBroj == voznja.Dolazak.Adresa.UlicaIBroj)
				//	{
				//		return false;
				//	}
				//}

				string path = "~/App_Data/Voznje.txt";
				path = HostingEnvironment.MapPath(path);
				string[] idCount = File.ReadAllLines(path);

				voznja.IdVoznje = idCount.Length + 1;
				voznja.DTPorudzbine = DateTime.Now;
				voznja.Dolazak.Adresa.IdAdr = voznja.IdVoznje + 1000;
				voznja.Dolazak.IdLok = voznja.IdVoznje + 2000;

				if (voznja.MusterijaVoznja != null)					/* ako je kreirala musterija */
				{
					voznja.StatusVoznje = StatusVoznje.Kreirana;
				}
				else if (voznja.DispecerVoznja != null)				/* ako je kreirao dispecer */
				{
					voznja.StatusVoznje = StatusVoznje.Formirana;
					foreach (Vozac vo in Vozaci.vozaci.Values)
					{
						if (vo.KorisnickoIme == voznja.VozacVoznja)
						{
							vo.Zauzet = true;
							UpisIzmenaTxtVozac(vo);
						}
					}
				}

				voznja.Komentar = new Komentar();
				voznja.Odrediste = new Lokacija();
				Voznje.voznje.Add(voznja.IdVoznje, voznja);
				UpisTxt(voznja);
				return true;
			}

			if (Voznje.voznje == null)
			{
				Voznje.voznje = new Dictionary<int, Voznja>();
				string path = "~/App_Data/Voznje.txt";
				path = HostingEnvironment.MapPath(path);
				string[] idCount1 = File.ReadAllLines(path);

				voznja.IdVoznje = idCount1.Length + 1;
				voznja.DTPorudzbine = DateTime.Now;
				if (voznja.MusterijaVoznja != null && voznja.StatusVoznje != StatusVoznje.Otkazana)
				{
					voznja.StatusVoznje = StatusVoznje.Kreirana;
				}
				else if (voznja.DispecerVoznja != null)
				{
					voznja.StatusVoznje = StatusVoznje.Formirana;
				}
				else
				{
					voznja.StatusVoznje = StatusVoznje.Prihvacena;
				}
				voznja.Komentar = new Komentar();
				voznja.Odrediste = new Lokacija();
				Voznje.voznje.Add(voznja.IdVoznje, voznja);
				UpisTxt(voznja);
				return true;
			}
			return false;
		}

		private void UpisTxt(Voznja k)
		{
			string path = "~/App_Data/Voznje.txt";
			path = HostingEnvironment.MapPath(path);
			FileStream stream = new FileStream(path, FileMode.Append);
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

		// izmena voznje
		// PUT api/Voznja/1
		public bool Put(int id, [FromBody]Voznja voznja)
		{
			foreach(Voznja vo in Voznje.voznje.Values)
			{
				if (vo.IdVoznje == id)
				{
					voznja.TipAutaVoznje = vo.TipAutaVoznje;
					voznja.IdVoznje = vo.IdVoznje;
					voznja.DTPorudzbine = vo.DTPorudzbine;

					// status voznje
					if (voznja.StatusVoznje == StatusVoznje.Otkazana)
					{
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
					else if (voznja.StatusVoznje == StatusVoznje.Kreirana)
					{
						if (voznja.VozacVoznja == null && voznja.DispecerVoznja == null)
						{
							if (vo.Komentar != null)
							{
								voznja.Komentar = new Komentar();
								voznja.Komentar = vo.Komentar;
							}
							else
							{
								voznja.Komentar = new Komentar();
							}
							voznja.Odrediste = new Lokacija();
						}
						else if (voznja.VozacVoznja != null && voznja.DispecerVoznja != null)
						{
							voznja.StatusVoznje = StatusVoznje.Obradjena;
							voznja.MusterijaVoznja = vo.MusterijaVoznja;

							foreach (Vozac v in Vozaci.vozaci.Values)
							{
								if (v.KorisnickoIme == voznja.VozacVoznja)
								{
									v.Zauzet = true;
									UpisIzmenaTxtVozac(v);
								}
							}

							if (vo.Komentar != null)
							{
								voznja.Komentar = new Komentar();
								voznja.Komentar = vo.Komentar;
							}
							else
							{
								voznja.Komentar = new Komentar();
							}
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
					else if (voznja.StatusVoznje == StatusVoznje.Neuspesna)
					{
						foreach (Vozac v in Vozaci.vozaci.Values)
						{
							if (v.KorisnickoIme == voznja.VozacVoznja)
							{
								v.Zauzet = false;
								UpisIzmenaTxtVozac(v);
							}
						}

						voznja.MusterijaVoznja = vo.MusterijaVoznja;
						voznja.DispecerVoznja = vo.DispecerVoznja;
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
					else if (voznja.StatusVoznje == StatusVoznje.Uspesna)
					{
						foreach (Vozac v in Vozaci.vozaci.Values)
						{
							if (v.KorisnickoIme == voznja.VozacVoznja)
							{
								v.Zauzet = false;
								UpisIzmenaTxtVozac(v);
							}
						}
						if (voznja.Komentar == null)
						{
							if (vo.Komentar != null)
							{
								voznja.Komentar = new Komentar();
								voznja.Komentar = vo.Komentar;
							}
							else
							{
								voznja.Komentar = new Komentar();
							}
						}

						if (voznja.Iznos == 0)
						{
							if (vo.Iznos != 0)
							{
								voznja.Iznos = vo.Iznos;
							}
						}
						if (voznja.VozacVoznja == null)
						{
							if (vo.VozacVoznja != null)
							{
								voznja.VozacVoznja = vo.VozacVoznja;
							}
						}

						voznja.MusterijaVoznja = vo.MusterijaVoznja;
						voznja.DispecerVoznja = vo.DispecerVoznja;
						voznja.Dolazak = new Lokacija();
						voznja.Dolazak.IdLok = vo.Dolazak.IdLok;
						voznja.Dolazak.X = vo.Dolazak.X;
						voznja.Dolazak.Y = vo.Dolazak.Y;
						voznja.Dolazak.Adresa.IdAdr = vo.Dolazak.Adresa.IdAdr;
						voznja.Dolazak.Adresa.UlicaIBroj = vo.Dolazak.Adresa.UlicaIBroj;
						voznja.Dolazak.Adresa.NaseljenoMesto = vo.Dolazak.Adresa.NaseljenoMesto;
						voznja.Dolazak.Adresa.PozivniBroj = vo.Dolazak.Adresa.PozivniBroj;

						if (voznja.Odrediste == null)
						{
							if (vo.Odrediste != null)
							{
								voznja.Odrediste = new Lokacija();
								voznja.Odrediste = vo.Odrediste;
							}
							else
							{
								voznja.Odrediste = new Lokacija();
							}
						}
					}
					else if (voznja.StatusVoznje == StatusVoznje.Prihvacena)
					{
						foreach (Vozac v in Vozaci.vozaci.Values)
						{
							if (v.KorisnickoIme == voznja.VozacVoznja)
							{
								v.Zauzet = true;
								UpisIzmenaTxtVozac(v);
							}
						}
						if (voznja.Komentar == null)
						{
							if (vo.Komentar != null)
							{
								voznja.Komentar = new Komentar();
								voznja.Komentar = vo.Komentar;
							}
							else
							{
								voznja.Komentar = new Komentar();
							}
						}
						if (voznja.DispecerVoznja == null)
						{
							if (vo.DispecerVoznja != null)
							{

								voznja.DispecerVoznja = vo.DispecerVoznja;
							}
						}
						voznja.MusterijaVoznja = vo.MusterijaVoznja;
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

					Voznje.voznje.Remove(vo.IdVoznje);
					Voznje.voznje.Add(voznja.IdVoznje, voznja);
					UpisIzmenaTxt(voznja);
					return true;
				}
			}
			return false;
		}

		private void UpisIzmenaTxt(Voznja k)
		{
			string path = "~/App_Data/Voznje.txt";
			path = HostingEnvironment.MapPath(path);
			string[] lines = File.ReadAllLines(path);
			string allString = "";

			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Split('|')[0].Equals(k.IdVoznje.ToString()))
				{
					allString += k.IdVoznje.ToString() + '|' + k.DTPorudzbine.ToString() + '|' + k.Dolazak.IdLok.ToString() + '|' + k.Dolazak.X.ToString() + '|' + k.Dolazak.Y.ToString() + '|' + k.Dolazak.Adresa.IdAdr.ToString() + '|' + k.Dolazak.Adresa.UlicaIBroj + '|' + k.Dolazak.Adresa.NaseljenoMesto + '|' + k.Dolazak.Adresa.PozivniBroj + '|' + k.TipAutaVoznje + '|' + k.MusterijaVoznja + '|' + k.Odrediste.IdLok.ToString() + '|' + k.Odrediste.X.ToString() + '|' + k.Odrediste.Y.ToString() + '|' + k.Odrediste.Adresa.IdAdr.ToString() + '|' + k.Odrediste.Adresa.UlicaIBroj + '|' + k.Odrediste.Adresa.NaseljenoMesto + '|' + k.Odrediste.Adresa.PozivniBroj + '|' + k.VozacVoznja + '|' + k.Iznos.ToString() + '|' + k.DispecerVoznja + '|' + k.Komentar.Opis + '|' + k.Komentar.DTObjave.ToString() + '|' + k.Komentar.KorImeKorisnikKomentar + '|' + k.Komentar.IdVoznjaKomentar.ToString() + '|' + k.Komentar.Ocena.ToString() + '|' + k.StatusVoznje;
					lines[i] = allString;
				}
			}

			File.WriteAllLines(path, lines);
		}

		private void UpisIzmenaTxtVozac(Vozac vozac)
		{
			string path = "~/App_Data/Voznje.txt";
			path = HostingEnvironment.MapPath(path);
			string[] lines = System.IO.File.ReadAllLines(path);
			string allString = "";
			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Split('|')[0].Equals(vozac.Id.ToString()))
				{
					allString += vozac.Id.ToString() + '|' + vozac.KorisnickoIme + '|' + vozac.Lozinka + '|' + vozac.Ime + '|' + vozac.Prezime + '|' + vozac.Pol + '|' + vozac.JMBG + '|' + vozac.KontaktTelefon + '|' + vozac.Email + '|' + vozac.Uloga + '|' + vozac.Lokacija.IdLok.ToString() + '|' + vozac.Lokacija.X.ToString() + '|' + vozac.Lokacija.Y.ToString() + '|' + vozac.Lokacija.Adresa.IdAdr.ToString() + '|' + vozac.Lokacija.Adresa.UlicaIBroj + '|' + vozac.Lokacija.Adresa.NaseljenoMesto + '|' + vozac.Lokacija.Adresa.PozivniBroj + '|' + vozac.Automobil.IdVozac.ToString() + '|' + vozac.Automobil.Godiste + '|' + vozac.Automobil.Registracija + '|' + vozac.Automobil.BrojVozila.ToString() + '|' + vozac.Automobil.TipAuta + '|' + vozac.Zauzet.ToString() + '|' + vozac.Banovan.ToString();
					lines[i] = allString;
				}
			}
			System.IO.File.WriteAllLines(path, lines);
		}
	}
}

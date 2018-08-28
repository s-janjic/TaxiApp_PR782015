using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiApp.Models.Classes;
using System.IO;
using System.Web.Hosting;

namespace TaxiApp.Controllers
{
    public class KorisnikController : ApiController
    {
		// edit user info
		// PUT api/Korisnik/1
		public bool Put(int id, [FromBody]Korisnik korisnik)
		{
			foreach (Korisnik kor in Korisnici.korisnici.Values)
			{
				if (kor.Id == id)
				{
					if (korisnik.KorisnickoIme == null)
					{
						korisnik.KorisnickoIme = kor.KorisnickoIme;
					}

					if (korisnik.Lozinka == null)
					{
						korisnik.Lozinka = kor.Lozinka;
					}

					if (korisnik.Ime == null)
					{
						korisnik.Ime = kor.Ime;
					}

					if (korisnik.Prezime == null)
					{
						korisnik.Prezime = kor.Prezime;
					}

					korisnik.Pol = kor.Pol;

					if (korisnik.JMBG == null)
					{
						korisnik.JMBG = kor.JMBG;
					}

					if (korisnik.Email == null)
					{
						korisnik.Email = kor.Email;
					}

					if (korisnik.KontaktTelefon == null)
					{
						korisnik.KontaktTelefon = kor.KontaktTelefon;
					}

					korisnik.Uloga = kor.Uloga;

					Korisnici.korisnici.Remove(kor.Id);
					Korisnici.korisnici.Add(korisnik.Id, korisnik);
					UpisIzmenaTxt(korisnik);
					return true;
				}
			}
			return false;
		}

		private void UpisIzmenaTxt(Korisnik k)
		{
			string path = "~/App_Data/Korisnici.txt";
			path = HostingEnvironment.MapPath(path);
			string[] lines = File.ReadAllLines(path);
			string allString = "";
			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Split('|')[1].Equals(k.KorisnickoIme.ToString()))
				{
					allString += k.Id.ToString() + '|' + k.KorisnickoIme + '|' + k.Lozinka + '|' + k.Ime + '|' + k.Prezime + '|' + k.Pol + '|' + k.JMBG + '|' + k.KontaktTelefon + '|' + k.Email + '|' + k.Uloga + '|' + k.Banovan.ToString();
					lines[i] = allString;
				}
			}
			File.WriteAllLines(path, lines);
		}

		// POST api/korisnik
		public bool Post([FromBody]Korisnik korisnik)
		{
			foreach (Korisnik kor in Korisnici.korisnici.Values)
			{
				if (kor.KorisnickoIme == korisnik.KorisnickoIme)
				{
					return false;
				}
			}

			foreach (Dispecer d in Dispeceri.dispeceri.Values)
			{
				if (d.KorisnickoIme == korisnik.KorisnickoIme)
				{
					return false;
				}
			}

			foreach (Vozac v in Vozaci.vozaci.Values)
			{
				if (v.KorisnickoIme == korisnik.KorisnickoIme)
				{
					return false;
				}
			}

			string path = "~/App_Data/Korisnici.txt";
			path = HostingEnvironment.MapPath(path);
			string[] idCount = File.ReadAllLines(path);

			Korisnici.korisnici = new Dictionary<int, Korisnik>();
			korisnik.Id = idCount.Length + 1;
			korisnik.Uloga = Uloge.Musterija;
			Korisnici.korisnici.Add(korisnik.Id, korisnik);
			UpisTxt(korisnik);
			return true;
		}

		private void UpisTxt(Korisnik k)
		{
			string path = "~/App_Data/Korisnici.txt";
			path = HostingEnvironment.MapPath(path);
			FileStream stream = new FileStream(path, FileMode.Append);

			using (StreamWriter tw = new StreamWriter(stream))
			{
				string upis = k.Id.ToString() + '|' + k.KorisnickoIme + '|' + k.Lozinka + '|' + k.Ime + '|' + k.Prezime + '|' + k.Pol + '|' + k.JMBG + '|' + k.KontaktTelefon + '|' + k.Email + '|' + k.Uloga + '|' + k.Banovan.ToString();
				tw.WriteLine(upis);
			}
			stream.Close();
		}

		// GET api/Korisnik
		public Dictionary<int, Korisnik> Get()
		{
			return Korisnici.korisnici;
		}

		// GET api/Korisnik/1
		public Korisnik Get(int id)
		{
			return Korisnici.korisnici[id];
		}
	}
}

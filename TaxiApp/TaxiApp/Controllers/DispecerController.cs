using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using TaxiApp.Models.Classes;

namespace TaxiApp.Controllers
{
    public class DispecerController : ApiController
    {
		// PUT api/Dispecer/1      edit
		public bool Put(int id, [FromBody]Dispecer dispecer)
		{
			foreach (Dispecer d in Dispeceri.dispeceri.Values)
			{
				if (d.Id == id)
				{
					Dispeceri.dispeceri.Remove(d.Id);
					Dispecer disp = new Dispecer(dispecer.Id, dispecer.KorisnickoIme, dispecer.Lozinka, dispecer.Ime, dispecer.Prezime, dispecer.Pol, dispecer.JMBG, dispecer.KontaktTelefon, dispecer.Email, dispecer.Uloga);
					Dispeceri.dispeceri.Add(disp.Id, disp);
					UpisIzmenaDispTxt(dispecer);
					return true;
				}
			}
			return false;
		}

		private void UpisIzmenaDispTxt(Dispecer k)
		{
			string path = "~/App_Data/Dispeceri.txt";
			path = HostingEnvironment.MapPath(path);
			string[] lines = File.ReadAllLines(path);
			string allString = "";
			for (int i = 0; i < lines.Length; i++)
			{
				if (lines[i].Split('|')[1].Equals(k.KorisnickoIme.ToString()))
				{
					allString += k.Id.ToString() + '|' + k.KorisnickoIme + '|' + k.Lozinka + '|' + k.Ime + '|' + k.Prezime + '|' + k.Pol + '|' + k.JMBG + '|' + k.KontaktTelefon + '|' + k.Email + '|' + k.Uloga;
					lines[i] = allString;
				}
			}
			File.WriteAllLines(path, lines);
		}
	}
}

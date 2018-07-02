using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiApp.Models.Classes;

namespace TaxiApp.Controllers
{
    public class StartController : ApiController
    {
		// controller after login
		public Korisnik Post([FromBody]string value)
		{
			foreach (var k in Korisnici.korisnici.Values)
			{
				if (k.KorisnickoIme == value)
				{
					return k; // vraca obj korisnika
				}
			}

			foreach (var d in Dispeceri.dispeceri.Values)
			{
				if (d.KorisnickoIme == value)
				{
					return d; // vraca obj dispecera
				}
			}

			// ako ne nadje nista = null
			return null;
		}
    }
}

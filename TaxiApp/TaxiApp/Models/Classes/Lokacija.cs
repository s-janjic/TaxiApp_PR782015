using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Lokacija
	{
		double xKoordinate;
		double yKoordinate;
		Adresa adresa;

		public Lokacija()
		{

		}

		public Lokacija(double xk, double yk, Adresa adr)
		{
			this.XKoordinate = xk;
			this.YKoordinate = yk;
			this.Adresa = adr;
		}

		public double XKoordinate { get => xKoordinate; set => xKoordinate = value; }
		public double YKoordinate { get => yKoordinate; set => yKoordinate = value; }
		public Adresa Adresa { get => adresa; set => adresa = value; }
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiApp.Models.Classes
{
	public class Lokacija
	{
		public string Id { get; set; }
		public int X { get; set; }
		public int Y { get; set; }
		public Adresa Adresa { get; set; }
	}
}
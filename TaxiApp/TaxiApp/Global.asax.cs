using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using TaxiApp.Models.Classes;

namespace TaxiApp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

			Korisnici users = new Korisnici(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Korisnici.txt");
			Dispeceri disp = new Dispeceri(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Dispeceri.txt");
			Vozaci vozaci1 = new Vozaci(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Vozaci.txt");
			Voznje voznje1 = new Voznje(@"C:\Users\stefan\Desktop\FAX\Web\TaxiApp_PR782015\TaxiApp\TaxiApp\App_Data\Voznje.txt");
		}
    }
}

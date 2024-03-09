using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PiBooking.Application.AppSettings;
using Syncfusion.EJ.ReportViewer;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PiBooking.API.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/[controller]")]

    public class ReportController : Controller, IReportController
    {
        // Report viewer requires a memory cache to store the information of consecutive client request and
        // have the rendered report viewer information in server.
        private Microsoft.Extensions.Caching.Memory.IMemoryCache _cache;
        private string _connection; 
        // IHostingEnvironment used with sample to get the application data from wwwroot.
        private Microsoft.AspNetCore.Hosting.IWebHostEnvironment _hostingEnvironment;

        public ReportController(IOptions<AppSettings> settings, Microsoft.Extensions.Caching.Memory.IMemoryCache memoryCache,
            Microsoft.AspNetCore.Hosting.IWebHostEnvironment hostingEnvironment)
        {
            _cache = memoryCache;
            _hostingEnvironment = hostingEnvironment;
            _connection = settings.Value.PersistanceConnectionString;

        }


        [HttpPost("PostReportAction")]
        // Post action to process the report from server based json parameters and send the result back to the client.
        public object PostReportAction([FromBody] Dictionary<string, object> jsonArray)
        {
            return Syncfusion.EJ.ReportViewer.ReportHelper.ProcessReport(jsonArray, this, this._cache);
        }

        public void OnInitReportOptions(ReportViewerOptions reportOption)
        {
            string basePath = _hostingEnvironment.ContentRootPath;
            // Here, we have loaded the sample report report from application the folder wwwroot. Sample.rdl should be there in wwwroot application folder.
            FileStream reportStream;
            if (reportOption.ReportModel.ReportPath=="HasPaid.RDL")
            {
                 reportStream = new FileStream(basePath + @"\Reports\HasPaid.Rdl", FileMode.Open, FileAccess.Read);
            }
            else
            {
                reportStream = new FileStream(basePath + @"\Reports\Upcoming.Rdl", FileMode.Open, FileAccess.Read);

            }
 
 
            //Ug.. XML parsing to correct the connect string
            XElement rdl = XElement.Load(XmlReader.Create(reportStream)); 
            XNamespace ns = rdl.Name.Namespace;
            XElement ct = rdl.Elements(ns + "DataSources").Elements(ns + "DataSource").Elements(ns + "ConnectionProperties").Elements(ns + "ConnectString").FirstOrDefault();
            if (ct != null)
            {
                 ct.Value = this._connection;
            }
        

 
            reportOption.ReportModel.Stream= new MemoryStream(Encoding.UTF8.GetBytes(rdl.ToString() ?? ""));

        }

        public void OnReportLoaded(ReportViewerOptions reportOption)
        {
 
        }

        [HttpPost("PostFormReportAction")]
        public object PostFormReportAction()
        {
            return Syncfusion.EJ.ReportViewer.ReportHelper.ProcessReport(null, this, _cache);
        }

        [ActionName("GetResource")]
        [AcceptVerbs("GET")]
        [Route("GetResource")]
        public object GetResource(ReportResource resource)
        { 
            return Syncfusion.EJ.ReportViewer.ReportHelper.GetResource(resource, this, _cache);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using PiBooking.Core.AppSettings;
using PiBooking.Core.Repository;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core;

namespace PiBooking.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.AddCors();
            services.AddMvc()
                        .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                        .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddSwaggerDocument();

            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfileConfiguration());
            });

            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);


            //internal for DI
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IEngineerRepository, EngineerRepository>();
            services.AddScoped<IJobRepository, JobRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ITimeSlotRepository, TimeSlotRepository>();

            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IEngineerService, EngineerService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ITimeSlotService, TimeSlotService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseCors(
              builder =>
              {
                  builder.AllowAnyHeader()
                       .AllowAnyMethod()
                       .SetIsOriginAllowed(_ => true)
                       .AllowCredentials();
              }
            );

            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();


            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}

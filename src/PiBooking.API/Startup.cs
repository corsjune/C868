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
using PiBooking.Application.AppSettings;
using PiBooking.Infrastructure.Repository;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core;
using PiBooking.Application.Services;
using Mvc.RenderViewToString;
using PiBooking.Application.Other;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Hosting;

namespace PiBooking.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.AddRazorPages();

            services.AddMvcCore().AddApiExplorer();
            services.AddSwaggerDocument();

            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfileConfiguration());
            });

            //AutoMapper

            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            //CORS for localhost
            services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost", builder =>
                {
                    builder.WithOrigins("http://localhost:5050", "http://localhost:8080") // Add more ports if needed
                           .AllowAnyHeader()
                           .AllowCredentials()
                           .AllowAnyMethod();
                });
            });

            //Settings
            var appSettingsSection = Configuration.GetSection("AppSettings");
            var appSettings = appSettingsSection.Get<AppSettings>();
            var connectionString = appSettings.PersistanceConnectionString;

            //internal for DI 
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IEngineerService, EngineerService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ITimeSlotService, TimeSlotService>();
            services.AddScoped<IUserService, UserService>();

            //todo: move this to use an options pattern instead of a direct connection string
            services.AddScoped<ICustomerRepository>(prov => new CustomerRepository(connectionString));
            services.AddScoped<IEngineerRepository>(prov => new EngineerRepository(connectionString));
            services.AddScoped<IJobRepository>(prov => new JobRepository(connectionString));
            services.AddScoped<IOrderRepository>(prov => new OrderRepository(connectionString, prov.GetService<ITimeSlotRepository>()));
            services.AddScoped<ITimeSlotRepository>(prov => new TimeSlotRepository(connectionString));
            services.AddScoped<IUserRepository>(prov => new UserRepository(connectionString));

            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IRazorViewToStringRenderer, RazorViewToStringRenderer>();

            //Code was adapted from the following reference
            //https://jasonwatmore.com/post/2018/09/08/aspnet-core-21-basic-authentication-tutorial-with-example-api
            //https://jasonwatmore.com/post/2018/06/26/aspnet-core-21-simple-api-for-authentication-registration-and-user-management
            // configure jwt authentication 
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        var userId = int.Parse(context.Principal.Identity.Name);
                        var user = userService.GetById(userId);
                        if (user == null)
                        {
                            // return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("AllowLocalhost");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

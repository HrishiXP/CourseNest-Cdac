
using CourseNest.Repositories;
using CourseNest;
using Microsoft.AspNetCore.Identity;
using CourseNest.Data;
//using CourseNest.Shared;
using Microsoft.EntityFrameworkCore;

namespace CourseNestAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
     .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
     });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));
            //builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            builder.Services
                .AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>()
                
                .AddDefaultTokenProviders();
            builder.Services.AddControllersWithViews();
            builder.Services.AddTransient<IHomeRepository, HomeRepository>();
            builder.Services.AddTransient<IEnrollmentCartRepository, EnrollmentCartRepository>();
            builder.Services.AddTransient<IUserEnrollmentRepository, UserEnrollmentRepository>();
            builder.Services.AddTransient<ISeatsRepository, SeatsRepository>();
            builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
           // builder.Services.AddTransient<IFileService, FileService>();
            builder.Services.AddTransient<ICourseRepository, CourseRepository>();

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AllowAnonymous", policy => policy.RequireAssertion(_ => true));
            });



            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CourseNestAPI V1");
                    //https://localhost:7105/swagger/index.html

                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            

            app.UseAuthorization();

            app.MapControllers();


            app.Run();
        }
    }
}




using Microsoft.AspNetCore.Identity;

namespace CourseNestAPI.Services
{
    public class NoOpEmailSender : IEmailSender 
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // No operation performed, just return a completed task
            return Task.CompletedTask;
        }
    }

}

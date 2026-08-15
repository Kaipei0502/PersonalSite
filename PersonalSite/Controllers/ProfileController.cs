using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using PersonalSite.Models;
using PersonalSite.Services;

namespace PersonalSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowFrontend")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            this.profileService = profileService;
        }

        [HttpGet]
        public async Task<ActionResult<ProfileModel>> Get()
        {
            var profile = await profileService.GetProfile();
            return Ok(profile);
        }
    }
}

using KutuphaneAPI.Data.Concrate;
using KutuphaneAPI.Entity;
using Microsoft.AspNetCore.Mvc;

namespace KutuphaneAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AccountController : Controller
    {
        private readonly Context _context;

        public AccountController(Context context)
        {
            _context = context;
        }

       [HttpPost("Login")]
public IActionResult Login(User user)
{
    if (user != null)
    {
        var dbUser = _context.Users
            .FirstOrDefault(x => x.UserName == user.UserName && x.UserPassword == user.UserPassword); // Kullanıcı adı ve şifre kontrolü
        if (dbUser != null)
        {
            return Ok(new { UserID = dbUser.UserID, UserName = dbUser.UserName });
        }
        else
        {
            return BadRequest("Invalid username or password.");
        }
    }
    return NotFound("User not provided.");
}



        [HttpPost("Register")]
        public IActionResult Register(User user)
        {
            if (user.UserName != null && user.UserPassword != null)
            {
                var userCheck = _context.Users.Any(x => x.UserName == user.UserName);
                if (userCheck == true)
                {
                    return BadRequest(userCheck);
                }
                else
                {
                    _context.Users.Add(user);
                    _context.SaveChanges();
                    return Ok(); 
                }
            }
            else
            {
                return BadRequest(); 
            }
        }

    }
}

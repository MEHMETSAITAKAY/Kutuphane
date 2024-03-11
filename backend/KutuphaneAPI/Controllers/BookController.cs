using KutuphaneAPI.Data.Concrate;
using KutuphaneAPI.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace KutuphaneAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class BookController : Controller
    {

        private readonly Context _context;

        public BookController(Context context)
        {
            _context = context;
        }

        [HttpGet("GetAllBook")]
        public IActionResult GetAllBook()
        {
            return Ok(_context.Books.ToList());
        }
      [HttpPost("CreateBook")]
        public IActionResult CreateBook([FromBody]Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Books.Add(book);
            _context.SaveChanges();
            return Ok(book); 
        }

        [HttpDelete("DeleteBook/{bookID}")]
     public IActionResult DeleteBook(int bookID)
{
    if (bookID == 0)
    {
        return BadRequest("Invalid book ID.");
    }

    var removedBook = _context.Books.Find(bookID);
    if (removedBook == null)
    {
        return NotFound($"Book with ID {bookID} not found.");
    }

    _context.Books.Remove(removedBook);
    _context.SaveChanges();
    return Ok($"Book with ID {bookID} has been deleted.");
}


 [HttpPost("UpdateBook")]
public IActionResult UpdateBook([FromBody]Book book)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var existingBook = _context.Books.Find(book.BookID);
    if (existingBook == null)
    {
        return NotFound($"Book with ID {book.BookID} not found.");
    }

    _context.Books.Entry(existingBook).CurrentValues.SetValues(book);
    _context.SaveChanges();

    return Ok(book);
}

        [HttpGet("Search")]
        public IActionResult Search(string bookName)
        {
            if (!bookName.IsNullOrEmpty())
            {
                return Ok(_context.Books.ToList().Where(x => x.BookName.Contains(bookName)).ToList());
            }
            else
            {
                return BadRequest();
            }
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/character")]
[EnableCors("AllowSpecificOrigin")]
public class CharacterController : Controller
{
    private readonly LibraryContext context;

    public CharacterController(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         
    public List<Character> GetAllCharacters(string firstname, int? page, string sort, int length = 500, string dir = "asc")
    {
        IQueryable<Character> query = context.Characters;

        if (!string.IsNullOrWhiteSpace(firstname))
            query = query.Where(d => d.Firstname == firstname);

        if (!string.IsNullOrWhiteSpace(sort))
        {
            switch (sort)
            {
                case "age":
                    if (dir == "asc")
                        query = query.OrderBy(d => d.Age);
                    else if (dir == "desc")
                        query = query.OrderByDescending(d => d.Age);
                    break;
                case "lastname":
                    if (dir == "asc")
                        query = query.OrderBy(d => d.Lastname);
                    else if (dir == "desc")
                        query = query.OrderByDescending(d => d.Lastname);
                    break;
            }
        }

        if (page.HasValue)
            query = query.Skip(page.Value * length);
        query = query.Take(length);

        return query.ToList();
    }

    [Route("{id}")]   // api/v1/character/2
    [HttpGet]
    public IActionResult GetCharacter(int id)
    {
        var chara = context.Characters
                    .Include(d => d.Address)
                    .SingleOrDefault(d => d.Id == id);

        if (chara == null)
            return NotFound();

        return Ok(chara);
    }

    [Route("{id}/address")]  
    [HttpGet]
    public IActionResult GetAddressForCharacter(int id)
    {
        var chara = context.Characters
                    .Include(d => d.Address)
                    .SingleOrDefault(d => d.Id == id);
        if (chara == null)
            return NotFound();

        return Ok(chara.Address);
    }

    [HttpPost]
    public IActionResult CreateCharacter([FromBody] Character newCharacter)
    {
        //character toevoegen in de databank, Id wordt dan ook toegekend
        context.Characters.Add(newCharacter);
        context.SaveChanges();
        // Stuur een result 201 met het character als content
        return Ok("true");
    }

    [HttpPut]
    public IActionResult UpdateCharacter([FromBody] Character updateCharacter)
    {
        var orgCharacter = context.Characters.Find(updateCharacter.Id);
        if (orgCharacter == null)
            return NotFound();

        orgCharacter.Firstname = updateCharacter.Firstname;
        orgCharacter.Lastname = updateCharacter.Lastname;
        orgCharacter.Gender = updateCharacter.Gender;
        orgCharacter.Age = updateCharacter.Age;

        context.SaveChanges();
        return Ok(orgCharacter);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteCharacter(int id)
    {
        var chara = context.Characters.Find(id);
        if (chara == null)
            return NotFound();

        //character verwijderen ..
        context.Characters.Remove(chara);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }
}
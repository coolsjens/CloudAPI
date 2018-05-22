using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/character")]
public class CharacterController : Controller
{
    private readonly LibraryContext context;

    public CharacterController(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         
    public List<Character> GetAllCharacters(string firstname, string lastname, int? page, string sort, int length = 2, string dir = "asc")
    {
        IQueryable<Character> query = context.Characters;

        if (!string.IsNullOrWhiteSpace(firstname))
            query = query.Where(d => d.FirstName == firstname);
        if (!string.IsNullOrWhiteSpace(lastname))
            query = query.Where(d => d.LastName == lastname);

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
                case "registernumber":
                    if (dir == "asc")
                        query = query.OrderBy(d => d.RegisterNumber);
                    else if (dir == "desc")
                        query = query.OrderByDescending(d => d.RegisterNumber);
                    break;
            }
        }

        if (page.HasValue)
            query = query.Skip(page.Value * length);
        query = query.Take(length);

        return query.ToList();
    }

    [Route("{id}")]  
    [HttpGet]
    public IActionResult GetCharacter(int id)
    {
        var chara = context.Characters
                    .SingleOrDefault(d => d.Id == id);

        if (chara == null)
            return NotFound();

        return Ok(chara);
    }

    [HttpPost]
    public IActionResult CreateCharacter([FromBody] Character newCharacter)
    {
        context.Characters.Add(newCharacter);
        context.SaveChanges();
        // Stuur een result 201 met het boek als content
        return Created("", newCharacter);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteCharacter(int id)
    {
        var chara = context.Characters.Find(id);
        if (chara == null)
            return NotFound();
        context.Characters.Remove(chara);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }

    [HttpPut]
    public IActionResult UpdateCharacter([FromBody] Character updateCharacter)
    {
        var orgCharacter = context.Characters.Find(updateCharacter.Id);
        if (orgCharacter == null)
            return NotFound();

        orgCharacter.FirstName = updateCharacter.FirstName;
        orgCharacter.LastName = updateCharacter.LastName;
        orgCharacter.Gender = updateCharacter.Gender;
        orgCharacter.Age = updateCharacter.Age;
        orgCharacter.RegisterNumber = updateCharacter.RegisterNumber;

        context.SaveChanges();
        return Ok(orgCharacter);
    }



}
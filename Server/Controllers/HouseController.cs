using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/house")]
public class HouseController : Controller
{
    private readonly LibraryContext context;

    public HouseController(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         
    public List<House> GetAllHouses(string currentlord, string founder, int? page, string sort, int length = 2, string dir = "asc")
    {
        IQueryable<House> query = context.Houses;

        if (!string.IsNullOrWhiteSpace(currentlord))
            query = query.Where(d => d.CurrentLord == currentlord);
        if (!string.IsNullOrWhiteSpace(founder))
            query = query.Where(d => d.Founder == founder);

        if (!string.IsNullOrWhiteSpace(sort))
        {
            switch (sort)
            {
                case "yearfounded":
                    if (dir == "asc")
                        query = query.OrderBy(d => d.YearFounded);
                    else if (dir == "desc")
                        query = query.OrderByDescending(d => d.YearFounded);
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
    public IActionResult GetHouse(int id)
    {
        var house = context.Houses
                    .SingleOrDefault(d => d.Id == id);

        if (house == null)
            return NotFound();

        return Ok(house);
    }

    [HttpPost]
    public IActionResult CreateHouse([FromBody] House newHouse)
    {
        context.Houses.Add(newHouse);
        context.SaveChanges();
        // Stuur een result 201 met het boek als content
        return Created("", newHouse);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteHouse(int id)
    {
        var house = context.Houses.Find(id);
        if (house == null)
            return NotFound();
        context.Houses.Remove(house);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }

    [HttpPut]
    public IActionResult UpdateHouse([FromBody] House updateHouse)
    {
        var orgHouse = context.Houses.Find(updateHouse.Id);
        if (orgHouse == null)
            return NotFound();

        orgHouse.Name = updateHouse.Name;
        orgHouse.YearFounded = updateHouse.YearFounded;
        orgHouse.Founder =   updateHouse.Founder;
        orgHouse.Region = updateHouse.Region;
        orgHouse.CurrentLord =  updateHouse.CurrentLord;

        context.SaveChanges();
        return Ok(orgHouse);
    }



}
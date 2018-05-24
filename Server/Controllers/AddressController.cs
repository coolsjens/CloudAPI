using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/address")]
public class AddressController : Controller
{
    private readonly LibraryContext context;

    public AddressController(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         // api/addresses
    public List<Address> GetAllAddresses()
    {
        return context.Addresses.ToList();
    }

    [Route("{id}")]   // api/addresses/2
    [HttpGet]
    public IActionResult GetAdress(int id)
    {
        var add = context.Addresses.Find(id);
        if (add == null)
            return NotFound();

        return Ok(add);
    }

    [Route("{id}/character")]   
    [HttpGet]
    public IActionResult GetCharacterForAddress(int id)
    {
        var add = context.Addresses
                .Include(d => d.Characters)
                .SingleOrDefault(d => d.Id == id);

        if (add == null)
            return NotFound();

        return Ok(add.Characters);
    }

    [HttpPost]
    public IActionResult CreateAddress([FromBody] Address newAddress)
    {
        //Address toevoegen in de databank, Id wordt dan ook toegekend
        context.Addresses.Add(newAddress);
        context.SaveChanges();
        // Stuur een result 201 met het address als content
        return Created("", newAddress);
    }

    [HttpPut]
    public IActionResult UpdateAddress([FromBody] Address updateAddress)
    {
        var orgAddress = context.Addresses.Find(updateAddress.Id);
        if (orgAddress == null)
            return NotFound();

        orgAddress.Country = updateAddress.Country;
        orgAddress.City = updateAddress.City;
        orgAddress.Street = updateAddress.Street;
        orgAddress.Zipcode = updateAddress.Zipcode;
        orgAddress.Number = updateAddress.Number;
        
        context.SaveChanges();
        return Ok(orgAddress);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteAddress(int id)
    {
        var add = context.Addresses.Find(id);
        if (add == null)
            return NotFound();

        //address verwijderen ..
        context.Addresses.Remove(add);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }
}
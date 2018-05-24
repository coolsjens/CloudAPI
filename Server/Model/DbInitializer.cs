
using System.Linq;

namespace Model
{
    public class DBIntitializer
    {
        public static void Initialize(LibraryContext context)
        {
            //Create the db if not yet exists
            context.Database.EnsureCreated();
            
            //Are there already books present ?
            if (!context.Characters.Any())
            {
                var add1 = new Address()
                {
                    Country = "South Carolina",
                    City = "Charleston",
                    Street = "Broadway Street",
                    Number = 626,
                    Zipcode = 29424
                };
                context.Addresses.Add(add1);
                var add2 = new Address()
                {
                    Country = "Illinois",
                    City = "Champaign",
                    Street = "University Hill Road",
                    Number = 3372,
                    Zipcode = 61820
                };
                context.Addresses.Add(add2);

                //Create new book
                var chara = new Character()
                {
                    Firstname = "Tommy",
                    Lastname = "Torfs",
                    Age = 29,
                    Gender = "Male",
                    Address = add1
                };
                //Add the book to the collection of books
                context.Characters.Add(chara);
                chara = new Character()
                {
                    Firstname = "Janinne",
                    Lastname = "De Dekker",
                    Age = 56,
                    Gender = "Female",
                    Address = add2
                };
                context.Characters.Add(chara);
                //Save all the changes to the DB
                context.SaveChanges();
            }
        }
    }
}


                

                
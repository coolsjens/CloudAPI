
using System.Linq;

namespace Model
{
    public class DBInit
    {
        public static void Init(LibraryContext context)
        {
            //Create the db if not yet exists
            context.Database.EnsureCreated();
            
            if (!context.Characters.Any())
            {
                var chara = new Character()
                {
                    FirstName = "Jens",
                    LastName = "Cools",
                    Age = 19,
                    Gender = "Male",
                    RegisterNumber = 573198
                };
                context.Characters.Add(chara);
                chara = new Character()
                {
                    FirstName = "Tom",
                    LastName = "Knaepkens",
                    Age = 20,
                    Gender = "Male",
                    RegisterNumber = 848898
                };
                context.Characters.Add(chara);
                //Save all the changes to the DB
                context.SaveChanges();
            }

            else if (!context.Houses.Any())
            {
                var house = new House()
                {
                    Name = "house123",
                    Region = "antwerpen",
                    CurrentLord = "thomas",
                    Founder = "jens",
                    YearFounded = 1998
                };
                context.Houses.Add(house);
                house = new House()
                {
                    Name = "huisje123",
                    Region = "brussel",
                    CurrentLord = "wim",
                    Founder = "jens",
                    YearFounded = 1736
                };
                context.Houses.Add(house);
                //Save all the changes to the DB
                context.SaveChanges();
            }
        }
    }
}


                

                
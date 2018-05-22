
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
        }
    }
}


                

                
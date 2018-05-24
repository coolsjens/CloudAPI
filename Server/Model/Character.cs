

namespace Model
{
    public class Character
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int Age { get; set; }
        public string Gender {get; set;}
        public Address Address { get; set; }
        // public int AuthorId {get;set;}
    }
}
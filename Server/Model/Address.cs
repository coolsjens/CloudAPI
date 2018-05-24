using System.Collections.Generic;
using Newtonsoft.Json;

namespace Model
{
    public class Address
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int Zipcode { get; set; }
        public int Number { get; set; }
        [JsonIgnore]
        public ICollection<Character> Characters { get; set; }
    }
}
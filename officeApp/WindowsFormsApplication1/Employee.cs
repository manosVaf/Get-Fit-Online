using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApplication1
{
    class Employee:Person
    {
        public TimeSpan Start_shift { get; set; }
        public TimeSpan End_shift { get; set; }
    }
}

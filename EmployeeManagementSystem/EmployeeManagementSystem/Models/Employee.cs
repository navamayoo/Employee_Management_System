using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Models
{
    public class Employee
    {
        public int employeeId { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public DateTime dateOfBirth { get; set; }
        [Required]
        public int age { get; set; }
        [Required]
        public decimal salary { get; set; }
        [Required]
        public int departmentId { get; set; }
        public string departmentName { get; set; }



    }
}

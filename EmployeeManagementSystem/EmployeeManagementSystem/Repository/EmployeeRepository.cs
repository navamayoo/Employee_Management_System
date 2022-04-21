using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public IConfiguration Configuration { get; set; }
        public string connectionString;
        SqlCommand command;

        public EmployeeRepository(IConfiguration _configuration)
        {
            Configuration = _configuration;
            connectionString = Configuration["ConnectionStrings:DevConnection"];
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            List<Employee> employees = new List<Employee>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    string sql = "select * from Employees";
                    command = new SqlCommand(sql, connection);
                    connection.Open();
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        Employee  employee = new Employee();
                        employee.EmployeeId = Convert.ToInt32(dataReader["EmployeeId"]);
                        employee.FirstName = dataReader["FirstName"].ToString();
                        employee.LastName = dataReader["LastName"].ToString();
                        employee.Email = dataReader["Email"].ToString();
                        employee.DateOfBirth = Convert.ToDateTime(dataReader["DateOfBirth"].ToString());
                        employee.Age = Convert.ToInt32(dataReader["Age"]);
                        employee.Salary = Convert.ToDecimal(dataReader["Salary"]);
                        employee.DepartmentId = Convert.ToInt32(dataReader["DepartmentId"]);
                        employees.Add(employee);
                    }
                    dataReader.Close();

                }
                catch (Exception)
                {
                    throw;

                    employees = null;
                }
                return employees;
            }
        }

        public Employee GetEmployeeById(int id)
        {
            Employee employee = new Employee();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    string sql = "select * from Employees where  EmployeeId= '" + id + "' ";
                    command = new SqlCommand(sql, connection);
                    connection.Open();
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        employee.EmployeeId = id;
                        employee.FirstName = dataReader["FirstName"].ToString();
                        employee.LastName = dataReader["LastName"].ToString();
                        employee.Email = dataReader["Email"].ToString();
                        employee.DateOfBirth = Convert.ToDateTime(dataReader["DateOfBirth"].ToString());
                        employee.Age = Convert.ToInt32(dataReader["Age"]);
                        employee.Salary = Convert.ToDecimal(dataReader["Salary"]);
                        employee.DepartmentId = Convert.ToInt32(dataReader["DepartmentId"]);
                       
                    }
                    dataReader.Close();

                }
                catch (Exception)
                {
                    throw;
                    employee = null;
                }
                return employee;
            }
        }

        public Employee CreateEmployee(Employee employee)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "[dbo].[SP_CreateEmployee]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@FirstName", employee.FirstName.Trim());
                    command.Parameters.AddWithValue("@LastName", employee.LastName.Trim());
                    command.Parameters.AddWithValue("@Email", employee.Email.Trim());
                    command.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
                    command.Parameters.AddWithValue("@Age", employee.Age);
                    command.Parameters.AddWithValue("@Salary", employee.Salary);
                    command.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();


                }
                catch (Exception)
                {
                    throw;
                    employee = null;
                }
                return employee;
            }
        }

        public Employee UpdateEmployee(Employee employee)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "[dbo].[SP_UpdateEmployee]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
                    command.Parameters.AddWithValue("@FirstName", employee.FirstName.Trim());
                    command.Parameters.AddWithValue("@LastName", employee.LastName.Trim());
                    command.Parameters.AddWithValue("@Email", employee.Email.Trim());
                    command.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
                    command.Parameters.AddWithValue("@Age", employee.Age);
                    command.Parameters.AddWithValue("@Salary", employee.Salary);
                    command.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();

                }
                catch (Exception)
                {
                    throw;
                    employee = null;
                }
                return employee;
            }
        }

        public void DeleteEmployee(int id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "[dbo].[SP_DeleteEmployee]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@EmployeeId", id);
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();

                }
                catch (Exception)
                {
                    throw;
                }
                
            }
        }
    }
}

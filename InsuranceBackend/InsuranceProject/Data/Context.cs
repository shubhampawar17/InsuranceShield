using InsuranceProject.Models;
using InsuranceProject.Types;
using Microsoft.EntityFrameworkCore;

namespace InsuranceProject.Data
{
    public class Context:DbContext
    {
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Policy> Policies { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<InsuranceProject.Models.State> States { get; set; }
        public DbSet<City> Cities { get; set; }

        public DbSet<Claimm> claims { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public DbSet<InsurancePlan> Plans { get; set; }

        public DbSet<InsuranceScheme> InsuranceSchemes { get; set; }

        public DbSet<SchemeDetails> SchemeDetails { get; set; }

        public DbSet<Complaint> Complaints { get; set; }

        public DbSet<Installment> Installments { get; set; }    

        public DbSet<Nominee> Nominees { get; set; }

        public DbSet<Commission> Commissions { get; set; }

        public DbSet<InsuranceSettings> InsuranceSettings { get; set; }

        public DbSet<TaxSettings> Taxs { get; set; }

        public DbSet<PolicyType> PolicyTypes { get; set; }
        public Context(DbContextOptions<Context> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = new Guid("8c1bc05b-21a8-4b86-50bc-08dd115dd6c7"), RoleName = InsuranceProject.Types.Roles.ADMIN, BaseId = new Guid("11111111-1111-1111-1111-111111111111"), IsDeleted = false },
                new Role { Id = new Guid("9d9c16e3-8eb7-4e8c-50bd-08dd115dd6c7"), RoleName = InsuranceProject.Types.Roles.EMPLOYEE, BaseId = new Guid("22222222-2222-2222-2222-222222222222"), IsDeleted = false },
                new Role { Id = new Guid("a8f1b121-fd38-4733-50be-08dd115dd6c7"), RoleName = InsuranceProject.Types.Roles.AGENT, BaseId = new Guid("33333333-3333-3333-3333-333333333333"), IsDeleted = false },
                new Role { Id = new Guid("74c70ef9-b3f4-4e6d-50bb-08dd115dd6c7"), RoleName = InsuranceProject.Types.Roles.CUSTOMER, BaseId = new Guid("44444444-4444-4444-4444-444444444444"), IsDeleted = false }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}

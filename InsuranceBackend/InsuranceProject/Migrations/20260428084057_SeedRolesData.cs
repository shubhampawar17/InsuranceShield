using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InsuranceProject.Migrations
{
    /// <inheritdoc />
    public partial class SeedRolesData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "BaseId", "IsDeleted", "RoleName" },
                values: new object[,]
                {
                    { new Guid("74c70ef9-b3f4-4e6d-50bb-08dd115dd6c7"), new Guid("44444444-4444-4444-4444-444444444444"), false, 3 },
                    { new Guid("8c1bc05b-21a8-4b86-50bc-08dd115dd6c7"), new Guid("11111111-1111-1111-1111-111111111111"), false, 0 },
                    { new Guid("9d9c16e3-8eb7-4e8c-50bd-08dd115dd6c7"), new Guid("22222222-2222-2222-2222-222222222222"), false, 1 },
                    { new Guid("a8f1b121-fd38-4733-50be-08dd115dd6c7"), new Guid("33333333-3333-3333-3333-333333333333"), false, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("74c70ef9-b3f4-4e6d-50bb-08dd115dd6c7"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("8c1bc05b-21a8-4b86-50bc-08dd115dd6c7"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("9d9c16e3-8eb7-4e8c-50bd-08dd115dd6c7"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("a8f1b121-fd38-4733-50be-08dd115dd6c7"));
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Timelogger.Entities;
using Timelogger.Entities.Dto;

namespace Timelogger
{
	public class ApiContext : DbContext
	{
		public ApiContext(DbContextOptions<ApiContext> options)
			: base(options)
		{
		}

		public DbSet<Organization> Organizations { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Role> Roles { get; set; }
		public DbSet<Privilege> Privileges { get; set; }
		public DbSet<RolePrivilege> RolePrivileges { get; set; }
		public DbSet<Project> Projects { get; set; }
		public DbSet<Activity> Activities { get; set; }
		public DbSet<ProjectDetailsDto> ProjectsDto { get; set; }
		public DbSet<ActivityDetailsDto> ActivitiesDto { get; set; }
	}
}

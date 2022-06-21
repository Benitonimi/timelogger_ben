using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Timelogger.Entities;
using Microsoft.EntityFrameworkCore;

namespace Timelogger.Api.Controllers
{
    [Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("hello-world")]
		public string HelloWorld()
		{
			return "Hello Back!";
		}

        // GET api/projects
        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetProjects() => await _context.Projects.ToListAsync();

		// GET api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id) => await _context.Projects.FindAsync(id);
    }
}

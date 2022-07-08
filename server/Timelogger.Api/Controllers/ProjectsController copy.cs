using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Timelogger.Entities;
using System;
using Microsoft.AspNetCore.Http;
using Timelogger.Repositories.Interfaces;

namespace Timelogger.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
	[ApiController]
	public class ProjectsController : Controller
	{
		//private readonly ApiContext _context;
		private readonly IProjectRepo _repository;

		public ProjectsController(IProjectRepo repository)
		{
			//_context = context;
			_repository = repository;
		}

		[HttpGet]
		[Route("hello-world")]
		public string HelloWorld()
		{
			return "Hello Back!";
		}

		// GET api/projects
        [HttpGet]
        public IEnumerable<Project> GetAllProjects() =>  _repository.GetAll();

		// GET api/projects/{id}
        [HttpGet("{id}")]
		public IActionResult GetProjectById(string id)
		{
			var project = _repository.GetById(id);
			if (project == null)
			{
				return NotFound();
			}
			return Ok(project);
		}

		// POST api/projects
        [HttpPost]
        public ActionResult<Project> AddProject([FromBody]Project proj)
		{
			if (proj == null)
			{
				return BadRequest();
			}
			try
			{
				_repository.Add(proj);
				return Ok(proj.Id);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, ex);
			}
		}

		// PUT api/projects/update/{id}
        [HttpPut("update/{id}")]
        public ActionResult<Project> UpdateProject(string id, Project proj)
		{
			if(proj.Id.ToString() != id){
				return BadRequest();
			}

			try
			{
				_repository.Update(id, proj);
				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, ex);
			}
		}

		// DELETE api/projects/{id}
        [HttpDelete("{id}")]
        public ActionResult<Project> DeleteProject(string id)
		{
			try
			{
				_repository.Delete(id);
				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, ex);
			}
		}
    }
}

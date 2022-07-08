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
	public class ActivitiesController : Controller
	{
		//private readonly ApiContext _context;
		private readonly IActivityRepo _repository;

		public ActivitiesController(IActivityRepo repository)
		{
			//_context = context;
			_repository = repository;
		}

		// GET api/activities
        [HttpGet]
        public IEnumerable<Activity> GetAllActivities() =>  _repository.GetAll();

		// GET api/activities/{id}
        [HttpGet("{id}")]
		public IActionResult GetActivityById(string id)
		{
			var activity = _repository.GetById(id);
			if (activity == null)
			{
				return NotFound();
			}
			return Ok(activity);
		}

		// POST api/activities
        [HttpPost]
        public ActionResult<Activity> AddActivity([FromBody]Activity actvty)
		{
			if (actvty == null)
			{
				return BadRequest();
			}
			try
			{
				_repository.Add(actvty);
				return Ok(actvty.Id);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, ex);
			}
		}

		// PUT api/activities/update/{id}
        [HttpPut("update/{id}")]
        public ActionResult<Activity> UpdateActivity(string id, Activity actvty)
		{
			if(actvty.Id.ToString() != id){
				return BadRequest();
			}

			try
			{
				_repository.Update(id, actvty);
				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, ex);
			}
		}

		// DELETE api/activities/{id}
        [HttpDelete("{id}")]
        public ActionResult<Activity> DeleteActivity(string id)
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

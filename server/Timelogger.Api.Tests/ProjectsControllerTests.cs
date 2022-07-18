using Timelogger.Api.Controllers;
using NUnit.Framework;
using Moq;
using Timelogger.Entities;
using Timelogger.Repositories.Interfaces;
using System;

namespace Timelogger.Api.Tests
{
    public class ProjectsControllerTests
    {
        private readonly ProjectsController sut;
        private readonly Mock<IProjectRepo> projectRepoMock = new Mock<IProjectRepo>();

        public ProjectsControllerTests()
        {
            sut = new ProjectsController(projectRepoMock.Object);
        }

        [Test]
        public void HelloWorld_ShouldReply_HelloBack()
        {
            ProjectsController sut = new ProjectsController(null);

            string actual = sut.HelloWorld();

            Assert.AreEqual("Hello Back!", actual);
        }

        [Test]
        public void GetProjectById_ShouldReturnProject_WhenProjectExists()
        {
            //Arragne
            var projectId = new Guid();
            //projectRepoMock.setup(x => x.GetById(projectId)).return()
            //Act
            var project = sut.GetProjectById(projectId);

            //Assert
            Assert.AreEqual(projectId, project.projectId);

        }
    }
} 

import path from 'path'

import Project from '../models/projectModel'

export function projectsController(req, res) {
  Project.getProjects().then(projects => {
    res.render('pages/projects', {
      hero: {
        header: 'welcome to tails',
        body: "let's get started"
      },
      projects: projects
    })
  })
}

export function newProjectController(req, res) {
  res.render('forms/createProjectForm', {
    hero: {
      header: 'create new project'
    }
  })
}

export function editProjectController(req, res) {
  const { project } = req.query;

  res.render('forms/editProjectForm', {
    hero: {
      header: 'edit existing project',
      body: `edit the ${project} project`
    }
  })
}

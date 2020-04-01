import { PhysicalProject, TAILS_ERROR } from 'tails-fs'

const CONFIG_NO_EXIST =
  'error: config file cannot be read. ensure it is created and is valid'

export const command = 'physicalProject <command>'
export const desc = 'show or edit physicalProject information'
export const builder = function (yargs) {
  yargs.command(
    'list',
    'list all projects',
    (yargs) => {
      yargs.positional('namespace', {
        type: 'string',
        describe: 'project name',
      })
    },
    async (argv) => {
      let namespace = argv.namespace

      try {
        let projects = await PhysicalProject.list(namespace)
        console.log(projects)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidConfigError) {
          console.log(CONFIG_NO_EXISTS)
        } else {
          console.error(err)
        }
      }
    }
  )

  yargs.command(
    'show [project]',
    'show a project',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'project name',
      })

      yargs.positional('namespace', {
        type: 'string',
        describe: 'namespace project is in',
      })
    },
    async (argv) => {
      const name = argv.name
      const namespace = argv.namespace

      try {
        let project = await PhysicalProject.show(name, namespace)
        console.log(project)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidConfigError) {
          console.log(CONFIG_NO_EXISTS)
        } else if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.error(`error: invalid argument: name '${name}'`)
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.DoesNotExistError) {
          if (err.message === 'name') {
            console.error(`error: name '${name}' does not exist`)
          } else if (err.message === 'namespace') {
            console.error(`error: namespace '${namespace}' does not exist`)
          } else {
            console.error(err)
          }
        } else {
          console.log('dd')
          console.error(err)
        }
      }
    }
  )

  yargs.command(
    'create [project]',
    'create a project',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'project name',
      })

      yargs.positional('namespace', {
        type: 'string',
        describe: 'namespace project is in',
      })
    },
    async (argv) => {
      const name = argv.name
      const namespace = argv.namespace

      try {
        await PhysicalProject.create(name, namespace)
        console.log(`created project ${name}`)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidConfigError) {
          console.log(CONFIG_NO_EXISTS)
        } else if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.error(`error: invalid argument: name '${name}'`)
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.DoesNotExistError) {
          if (err.message === 'name') {
            console.error(`error: name '${name}' does not exist`)
          } else if (err.message === 'namespace') {
            console.error(`error: namespace '${namespace}' does not exist`)
          } else {
            console.error(err)
          }
        } else {
          console.log('dd')
          console.error(err)
        }
      }
    }
  )

  yargs.command(
    'delete [project]',
    'delete a project',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'project name',
      })

      yargs.positional('namespace', {
        type: 'string',
        describe: 'namespace project is in',
      })
    },
    async (argv) => {
      const name = argv.name
      const namespace = argv.namespace

      try {
        await PhysicalProject.delete(name, namespace)
        console.log(`deleted project ${name}`)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidConfigError) {
          console.log(CONFIG_NO_EXISTS)
        } else if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.error(`error: invalid argument: name '${name}'`)
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.DoesNotExistError) {
          if (err.message === 'name') {
            console.error(`error: name '${name}' does not exist`)
          } else if (err.message === 'namespace') {
            console.error(`error: namespace '${namespace}' does not exist`)
          } else {
            console.error(err)
          }
        } else {
          console.error(err)
        }
      }
    }
  )

  return yargs
}
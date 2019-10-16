const express = require('express')
const server = express()

server.use(express.json())
let counter = 0;
server.use ((req, res, next) => {
    counter++
    console.log(`This is the ${counter}th requisition`)
    return next()
})

server.listen(3000)

projects = [{
    id: "1",
    title: "Novo projeto",
    tasks: []
}]
server.get('/projects', (req, res) => {
    return res.json(projects)
})

server.post('/projects', (req, res) => {
    const project = req.body
    projects.push(project)
    return res.json(projects)
})

function retrieveProject(req, res, next) {
    const { id } = req.params
    // const project = projects.find(p => p.id == id);
    for (project of projects) {
        if (project.id == id){
            req.projectIndex = projects.indexOf(project)
            return next()
        }
        
    }
    return res.status(400).json({error: 'Invalid id.'})
}

server.put('/projects/:id',retrieveProject, (req, res) => {
    const index = req.projectIndex
    
    projects[index].title = req.body.title

    return res.json(projects)


})

server.delete('/projects/:id',retrieveProject, (req, res) => {
    const index = req.projectIndex
    projects.splice(index,1)
    return res.send()

})

server.post('/projects/:id/tasks', retrieveProject, (req, res) => {
    const index = req.projectIndex
    const task = req.body.task
    projects[index].tasks.push(task)
    return res.json(projects[index])
})



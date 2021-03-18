// Patch date object prototype for current app date format requirement
Date.prototype.toShortFormat = function() {
    let monthNames =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep", "Oct","Nov","Dec"];
    let day = this.getDate();
    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];
    let year = this.getFullYear();
    return `${day} ${monthName}, ${year}`;  
}

// Main app data & methods
const app = {

    newTask: '',

    tasks: {
        '18 Mar, 2020': [{ title: "To add new tasks just enter the task and press enter", done: false}],
    },

    toggleTask(date, id){
        this.tasks[date][id].done = !this.tasks[date][id].done
        this.save()
    },

    addTask(){
        const today = (new Date()).toShortFormat();
        if(!this.tasks[today]) this.tasks[today] = []
        this.tasks[today].push({ title: this.newTask, done: false })
        this.newTask = ''
        this.save()
    },

    sortDate(dates, order){
        dates.sort((d1,d2)=>{
            d1 = + new Date(d1)
            d2 = + new Date(d2)
            return d2 - d1
        })
        return dates
    },
    
    save() {
        window.localStorage.setItem('matter-most-tasks', JSON.stringify(this.tasks))
    }
}

// App initialisation
function initialData() {
    const data = window.localStorage.getItem('matter-most-tasks')
    if(data) app.tasks = JSON.parse(data)
    return app
}
// Class
function Model(options) {
    this.data = options.data
    this.resource = options.resource
}
Model.prototype.fetch = function (id) {
    return axios.get(`/${this.resource}/${id}`).then((response) => {
        this.data = response.data
        return response
    })
}
Model.prototype.update = function (data) {
    let id = this.data.id
    return axios.put(`/${this.resource}/${id}`, data).then((response) => {
        this.data = response.data
        return response
    })
}

function View({
    el,
    template
}) {
    this.el = el
    this.template = template
}
View.prototype.render = function (data) {
    let html = this.template
    for (let key in data) {
        html = html.replace(`__${key}__`, data[key])
    }
    $(this.el).html(html)
}

// MVC
let model = new Model({
    data: {
        name: '',
        number: 0,
        id: ''
    },
    resource: 'books',
})

let view = new View({
    el: '.app',
    template: `
    <div>
        <p>书名：《__name__》</p>
        <p>数量：<span class="number">__number__</span></p>
    </div>
    <div>
        <button class="addOne">加1</button>
        <button class="minusOne">减1</button>
        <button class="reset">归零</button>
    </div>
    `
})

let controller = {
    inti: function (options) {
        let {
            view,
            model
        } = options
        this.view = view
        this.model = model
        this.view.render(this.model.data)
        this.bindEvents()
        this.model.fetch('1').then(() => {
            this.view.render(this.model.data)
        })

    },
    addOne: function () {
        var oldNumber = $('.number').text()
        var newNumber = oldNumber - 0 + 1
        this.model.update({
            number: newNumber
        }).then(() => {
            this.view.render(this.model.data)
        })
    },
    minusOne: function () {
        var oldNumber = $('.number').text()
        var newNumber = oldNumber - 0 - 1
        this.model.update({
            number: newNumber
        }).then(() => {
            this.view.render(this.model.data)
        })
    },
    reset: function () {
        this.model.update({
            number: 0
        }).then(() => {
            this.view.render(this.model.data)
        })
    },
    bindEvents: function () {
        $(this.view.el).on('click', '.addOne', this.addOne.bind(this))
        $(this.view.el).on('click', '.minusOne', this.minusOne.bind(this))
        $(this.view.el).on('click', '.reset', this.reset.bind(this))
    }
}

controller.inti({
    view: view,
    model: model
})
// Class
function Model(options) {
    this.data = options.data
    this.resource = options.resource
}
Model.prototype.fetch = function (id) {
    return axios.get(`/${this.resource}s/${id}`).then((response) => {
        this.data = response.data
        return response
    })
}
Model.prototype.update = function (data) {
    let id = this.data.id
    return axios.put(`/${this.resource}s/${id}`, data).then((response) => {
        this.data = response.data
        return response
    })
}

// model
let model = new Model({
    data: {
        name: '',
        number: 0,
        id: ''
    },
    resource: 'book',
})

// Vue
let view = new Vue({
    el: '.app',
    data: {
        book: {
            name: '你的名字',
            number: 0,
            id: '1',

        },
        n: '1'
    },
    template: `
    <div>
        <div>
            <p>书名：《{{book.name}}》</p>
            <p>数量：<span class="number">{{book.number}}</span></p>
        </div>
        <div>
            <input v-model="n">
            <p>N 的值是{{n}}</p>
        </div>
        <div>
            <button v-on:click="addOne">加N</button>
            <button v-on:click="minusOne">减N</button>
            <button v-on:click="reset">归零</button>
        </div>
    </div>
    `,
    created: function () {
        model.fetch('1').then(() => {
            this.book = model.data
        })
    },
    methods: {
        addOne: function () {
            model.update({
                number: this.book.number + (this.n - 0)
            }).then(() => {
                this.book = model.data
            })
        },
        minusOne: function () {
            model.update({
                number: this.book.number - (this.n - 0)
            }).then(() => {
                this.book = model.data
            })
        },
        reset: function () {
            model.update({
                number: 0
            }).then(() => {
                this.book = model.data
            })
        },
    }
})
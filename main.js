axios.get('/books/1').then(({
    data
}) => {
    let originalHtml = $('.app').html()
    let newHtml = originalHtml.replace('__name__', data.name).replace('__number__', data.number)
    $('.app').html(newHtml)
})

// 按钮操作发PUT请求
$('.app').on('click', '.addOne', function () {
    var oldNumber = $('.number').text()
    var newNumber = oldNumber - 0 + 1
    axios.put('/books/1', {
        'number': newNumber
    }).then(() => {
        $('.number').text(newNumber)
    })
})
$('.app').on('click', '.minusOne', function () {
    var oldNumber = $('.number').text()
    var newNumber = oldNumber - 0 - 1
    axios.put('/books/1', {
        'number': newNumber
    }).then(() => {
        $('.number').text(newNumber)
    })
})
$('.app').on('click', '.reset', function () {
    axios.put('/books/1', {
        'number': 0
    }).then(() => {
        $('.number').text(0)
    })
})
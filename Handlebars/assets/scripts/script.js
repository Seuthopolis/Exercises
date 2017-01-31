var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'assets/scripts/data.json');
ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        createHTML(data);
    } else {
        alert('Error');
    }
};
ourRequest.send();

function createHTML(jsonData) {
    var rawData = document.getElementById('json-data').innerHTML;
    var compileData = Handlebars.compile(rawData);
    var generatedHTML = compileData(jsonData);
    var boxContainer = document.getElementById('box-container');
    boxContainer.innerHTML = generatedHTML;
}

$(function () {

    var createBlock = $('<div class="add-container">' +
        '<div class="to-hide">' +
        '<div class="add-data">' +
        '<div class="add-form">' +
        '<input type="text" id="input-id">' +
        '<label for="input-id"></label>' +
        '<button class="add-btn">ADD</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<button class="add-task task-btn">+ ADD TASK</button>' +
        '</div>');
    $('.col').append(createBlock);

    function infoCounter() {
        var infoCount = $('.info-count');
        var waitingLength = $('.waiting div').length - 5;
        var inProgressLength = $('.in-progress div').length - 5;
        var reviewLength = $('.review div').length - 5;
        infoCount.eq(0).html(waitingLength).css("color", "#65a6ff");
        infoCount.eq(1).html(inProgressLength).css("color", "#86bc40");
        infoCount.eq(2).html(reviewLength).css("color", "#fb7653");
    }

    infoCounter();

    var images = [
        "assets/images/face-1.png",
        "assets/images/face-2.png",
        "assets/images/face-3.png",
        "assets/images/face-4.png",
        "assets/images/face-5.png",
        "assets/images/face-6.png",
        "assets/images/face-7.png",
        "assets/images/face-8.png"
    ];

    $(".task-btn").click(function () {
        $(this).siblings('.to-hide').toggle();
    });

    $(".add-btn").click(function () {
        var inputValue = $(this).siblings('input').val();
        var randomImg = (Math.floor((Math.random() * images.length) + 1));
        var pathToImg = 'assets/images/face-' + randomImg + '.png';
        $(this).closest('.col').find('.col-content').append('<div class="ready">' + inputValue + '<img src="' + pathToImg + '">' + '</div>');
        $('.add-form').children('input').val('');
        infoCounter();
    });

});
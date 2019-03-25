$('.control-btn').mouseenter(function () {
    let type = $(this).attr("alt");
    if (type == "+") {
        $(this).attr("src", "/image/green-add.png");
    } else if (type == "-") {
        $(this).attr("src", "/image/red-remove.png");
    } else {
        $(this).attr("src", "/image/edit-blue.png");
    }
});

$(".control-btn").mouseleave(function () {
    let type = $(this).attr("alt");
    if (type == "+") {
        $(this).attr("src", "/image/add.png");
    } else if (type == "-") {
        $(this).attr("src", "/image/remove.png");
    } else {
        $(this).attr("src", "/image/edit.png");
    }
});

$(".control-btn").click(function () {
    let alt = $(this).attr('alt');
    let action = undefined;
    let admin_item = $(this).parent().parent().attr('id');
    switch (alt) {
        case '+':
            action = 'Add';
            break;
        case '-':
            action = 'Delete';
            break;
        case 'edit':
            action = 'Edit';
            break;
    }
    let strings = admin_item.split('-');
    let id = strings[strings.length - 1];
    let entity = undefined;
    switch (id) {
        case 'dep':
            entity = 'Department';
            break;
        case 'sub':
            entity = 'Subject';
            break;
        case 'stud':
            entity = 'Student';
            break;
    }
    $('#button-submit').text(action);
    $('#common-title').text(action + ' ' + entity);
    if (alt != '+' && id != 'stud') {
        $('#input-entity').attr('disabled', 'true');
    }
    if (id == 'stud') {
        if (alt == '+' || alt == 'edit') {
            $('#student-modal').css('display', 'flex');
            $('#student-title').text(action + ' ' + entity);
        } else {
            $('#common-modal').css('display', 'flex');
            $('#input-entity').attr('disabled', 'true');
        }
    } else if (id === 'sub') {
        $('#common-modal').css('display', 'flex');
    } else {
        $('#common-modal').css('display', 'flex');
    }
});

function clear() {
    console.log('CLEAR');
    $('img.ok').remove();
}

$(".close").click(function () {
    $('#common-modal').css('display', 'none');
    $('#student-modal').css('display', 'none');
    clear();
});

$(document).click(function (e) {
    if (!$(e.target).closest('.control-btn, #common-content').length) {
        $('#common-modal').css('display', 'none');
        //clear();
        //console.log('COMMON CLOSE');
    }
});

$(document).click(function (e) {
    if (!$(e.target).closest('.control-btn, #student-content').length) {
        $('#student-modal').css('display', 'none');
        //clear();
        //console.log('STUDENT CLOSE');
    }
});

$('#mon-btn').click(function () {
    $('#months').css('display', 'block');
});

$('#stud-dep-btn').click(function () {
    $('#stud-deps').css('display', 'block');
});

$('#months').mouseleave(function () {
    $('#months').css('display', 'none');
});

let ids = new Array();

$('.common-li').click(function () {
   const event = $('#common-title').text().split(' ')[0];
   let value = $(this).attr('value');
   if (event.toUpperCase() === "DELETE") {
       if ($(this).find('img').length == 0) {
           let img = document.createElement('img');
           img.src = '/image/ok.png';
           img.classList.add('ok');
           $(this).append(img);
           ids.push(value);
       } else {
           this.removeChild(this.lastChild);
           let index = ids.indexOf(value);
           if (index !== -1) {
               ids.splice(index, 1);
           }
       }
   } else {
       if (event.toUpperCase() === "EDIT") {
           console.log("EDIT EVENT");
           //TODO: open edit.
       }
   }
});

function deleteEnties(array, name) {
    let status = undefined;
    console.log('/api/' + name);
    $.ajax({
        url: '/api/' + name,
        dataType: "json",
        async: false,
        type: "DELETE",
        data: array,
        success: function (data) {
            status = data;
        }
    });
    return status;
}

$('#button-submit').click(function () {
    const buttonName  = $(this).text().toUpperCase();
    const entity = $('#common-title').text().split(' ')[1];
    console.log(buttonName);
    if (buttonName === 'ADD') {

    }  else if (buttonName === 'EDIT') {

    } else {
        deleteEnties(ids, entity.toLowerCase());
    }
});

$('.mon-item').click(function () {
    let month = $(this).text();
    let value = $(this).attr('value');
    $('#mon-btn').text(month);
    $('#months').css('display', 'none');
    document.getElementById("mon-v").value = value;
});

$('#dep-btn').click(function () {
    $('#stud-deps').css('display', 'block');
});

$('#stud-deps').mouseleave(function () {
    $('#stud-deps').css('display', 'none');
});

$('body').on('click', '.dep-item', function() {
    let dep = $(this).text();
    let value = $(this).attr('value');
    $('#stud-deps').css('display', 'none');
    $('#stud-dep-btn').text(dep);
    document.getElementById("dep-v").value = value;
});

$(document).ready(function() {
    let departments =  document.getElementById('stud-deps');
    const deps = getDepartments();
    for (let i in deps) {
        let div = document.createElement('div');
        div.innerHTML = deps[i].name;
        div.classList.add("dep-item");
        $(div).attr('value', deps[i].id);
        departments.appendChild(div);
    }
});
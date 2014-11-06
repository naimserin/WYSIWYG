$("[contenteditable='true']").keyup(function () {
    $("#editableSource").val(String($("#editable").html()).replace(/\r/g, '<br>').replace(/<div><br><\/div>/g, '<br>').replace(/line-height: [0-9].[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9];/, '').replace(/ style=""/gi, ''));
});
$("[data-cedit='font-family']").click(function () {
    document.execCommand('fontName', false, $(this).attr('data-font-family'));
});
$("[data-cedit='bold']").click(function () {
    document.execCommand('bold', false, null);
});
$("[data-cedit='italic']").click(function () {
    document.execCommand('italic', false, null);
});
$("[data-cedit='list']").click(function () {
    document.execCommand('insertOrderedList', false, null);
});
$("[data-cedit='left']").click(function (e) {
    document.execCommand('justifyLeft', false, null);
});
$("[data-cedit='center']").click(function (e) {
    document.execCommand('justifyCenter', false, null);
});
$("[data-cedit='right']").click(function (e) {
    document.execCommand('justifyRight', false, null);
});
$("[data-cedit='link']").click(function (e) {
    document.execCommand('createLink', false, $("#txtLink").val());
    $('#linkForm').toggle();
});
var sourceStatus = false;
$("[data-cedit='source']").click(function (e) {
    if (sourceStatus == false) {
        $("#editableSource").show();
        $("#editableSource").val(String($("#editable").html()).replace(/\r/g, '<br>').replace(/<div><br><\/div>/g, '<br>').replace(/line-height: [0-9].[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9];/, '').replace(/ style=""/gi, ''));
        $("#editable").hide();
        sourceStatus = true;
    } else {
        $("#editable").show();
        $("#editable").html($("#editableSource").val());
        $("#editableSource").hide();
        sourceStatus = false;
    }

});
$("[data-cedit='blockquote']").click(function (e) {
    var range = window.getSelection().getRangeAt(0);
    var newNode;

    newNode = document.createElement('blockquote');
    range.surroundContents(newNode);
});
$("[data-cedit='cite']").click(function (e) {
    var range = window.getSelection().getRangeAt(0);
    var newNode;
    if (range.commonAncestorContainer.parentNode != "cite") {
        newNode = document.createElement('cite');
    }
    range.surroundContents(newNode);
});

$("#btnImageUpload").ajaxUpload({
    url: "/home/SayfaFileUpload",
    name: "file",
    onSubmit: function () {

    },
    onComplete: function (result) {
        if (result != '"error"') {
            var adi = String(result).replace(/\"/g, "").split("|")[0];
            var type = String(result).replace(/\"/g, "").split("|")[1];

            var range = window.getSelection().getRangeAt(0);
            var newNode;
            if (range.commonAncestorContainer.parentNode != "img") {
                newNode = document.createElement('img');
                newNode.setAttribute('src', '/Upload/Sayfa/' + adi);
            }
            range.surroundContents(newNode);
            $("#editable img").mousedown(function () {
                $(this).addClass("imgActive");
            });


        } else {

        }
    }
});

$("#btnVideoUpload").ajaxUpload({
    url: "/home/SayfaFileUpload",
    name: "file",
    onSubmit: function () {

    },
    onComplete: function (result) {
        if (result != '"error"') {
            var adi = String(result).replace(/\"/g, "").split("|")[0];
            var type = String(result).replace(/\"/g, "").split("|")[1];

            var range = window.getSelection().getRangeAt(0);
            var newNode;
            if (range.commonAncestorContainer.parentNode != "video") {
                newNode = document.createElement('video');
                newNode.setAttribute('width', '100%');
                newNode.setAttribute('height', '240');
                newNode.setAttribute('src', '/Upload/Sayfa/' + adi);
                newNode.innerText = 'İnternet tarayıcınız HTML5 desteklememektedir.';
            }
            range.surroundContents(newNode);

        } else {

        }
    }
});

$("#btnFileUpload").ajaxUpload({
    url: "/home/SayfaFileUpload",
    name: "file",
    onSubmit: function () {

    },
    onComplete: function (result) {
        if (result != '"error"') {
            var adi = String(result).replace(/\"/g, "").split("|")[0];
            var type = String(result).replace(/\"/g, "").split("|")[1];

            var range = window.getSelection().getRangeAt(0);
            var newNode;
            if (range.commonAncestorContainer.parentNode != "a") {
                newNode = document.createElement('a');
                newNode.setAttribute('href', '/Upload/Sayfa/' + adi);
                newNode.innerText = window.getSelection().anchorNode.nodeValue;
            }
            range.surroundContents(newNode);

        } else {

        }
    }
});
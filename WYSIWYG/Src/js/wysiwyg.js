var editor = function () {
    $("[data-editor='true']").each(function (i, item) {
        var tool = '<div style="margin-bottom: 5px;" class="toolbox">';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<button class="btn btn-default dropdown-toggle" title="Font Family" data-toggle="dropdown"><span class="glyphicon glyphicon-font"></span>&nbsp;<span class="caret"></span></button>';
        tool += '<ul class="dropdown-menu" role="menu" aria-labelledby="font-family">';
        tool += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" style="font-family: cursive;" data-font-family="cursive" data-cedit="font-family">Cursive</a></li>';
        tool += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" style="font-family: fantasy;" data-font-family="fantasy" data-cedit="font-family">Fantasy</a></li>';
        tool += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" style="font-family: monospace;" data-font-family="monospace" data-cedit="font-family">Monospace</a></li>';
        tool += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" style="font-family: sans-serif;" data-font-family="sans-serif" data-cedit="font-family">Sans-Serif</a></li>';
        tool += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" style="font-family: serif;" data-font-family="serif" data-cedit="font-family">Serif</a></li>';
        tool += '</ul>';
        tool += '</div>';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<button class="btn btn-default" title="Bold" data-cedit="bold"><span class="glyphicon glyphicon-bold"></span></button>';
        tool += '<button class="btn btn-default" title="Italic" data-cedit="italic"><span class="glyphicon glyphicon-italic"></span></button>';
        tool += '</div>';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<button class="btn btn-default" title="List" data-cedit="list"><span class="glyphicon glyphicon-th-list"></span></button>';
        tool += '</div>';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<button class="btn btn-default" title="Left" data-cedit="left"><span class="glyphicon glyphicon-align-left"></span></button>';
        tool += '<button class="btn btn-default" title="Center" data-cedit="center"><span class="glyphicon glyphicon-align-center"></span></button>';
        tool += '<button class="btn btn-default" title="Right" data-cedit="right"><span class="glyphicon glyphicon-align-right"></span></button>';
        tool += '</div>';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<a id="btnImageUpload' + i + '" class="btn btn-default" title="Image Upload"><span class="glyphicon glyphicon-picture"></span></a>';
        tool += '<a id="btnVideoUpload' + i + '" class="btn btn-default" title="Video Upload"><span class="glyphicon glyphicon-facetime-video"></span></a>';
        tool += '<a id="btnFileUpload' + i + '" class="btn btn-default" title="File Upload"><span class="glyphicon glyphicon-paperclip"></span></a>';
        tool += '</div>';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<button class="btn btn-default dropdown-toggle" title="Link" data-cedit="btnLink' + i + '"><span class="glyphicon glyphicon-link"></span></button>';
        tool += '<div style="position: absolute; top: 32px; left: 0px; box-shadow: 0px 3px 5px #e0e0e0; border-radius: 5px; display: none;">';
        tool += '<div class="input-group">';
        tool += '<input type="text" class="form-control" placeholder="http://" id="txtLink' + i + '" style="width: 160px;" />';
        tool += '<span class="input-group-btn">';
        tool += '<button class="btn btn-default" type="button" data-cedit="link' + i + '">Ok!</button>';
        tool += '</span>';
        tool += '</div>';
        tool += '</div>';
        tool += '</div>';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<button class="btn btn-default" title="Blockquote" data-cedit="blockquote">Blockquote</button>';
        tool += '<button class="btn btn-default" title="Cite" data-cedit="cite">Cite</button>';
        tool += '</div>';
        tool += '<div class="btn-group btn-group-sm">';
        tool += '<button class="btn btn-default" title="Source" data-cedit="source' + i + '"><span class="glyphicon glyphicon-edit"></span></button>';
        tool += '</div>';
        tool += '</div>';
        tool += '<div contenteditable="true" data-editor-id="e' + i + '" style="display: block;border: solid 1px #e0e0e0;border-radius: 4px;min-height: 200px;padding:10px;"></div>';

        $(this).before(tool);
        $(this).attr({ 'data-editor-id': 's' + i });
        $(this).attr({ 'style': 'display:none;min-height:300px;' });

        var slc = null;
        $("[data-editor-id='e" + i + "']").on("keypress focusin focusout change click focus", function () {
            slc = window.getSelection().getRangeAt(0);

            $("[data-editor-id='s" + i + "']").val(ungzip(String($("[data-editor-id='e" + i + "']").html()).replace(/\r/g, '<br>').replace(/<div><br><\/div>/g, '<br>').replace(/line-height: [0-9].[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9];/, '').replace(/ style=""/gi, '')));
        });
        $("[data-editor-id='s" + i + "']").on("keypress focusin focusout change click focus", function () {
            $("[data-editor-id='e" + i + "']").html(gzip($("[data-editor-id='s" + i + "']").val()));
        });

        $("[data-cedit='source" + i + "']").click(function (e) {
            if ($("[data-editor-id='s" + i + "']").is(':visible') == false) {
                $("[data-editor-id='s" + i + "']").val(ungzip(String($("[data-editor-id='e" + i + "']").html()).replace(/\r/g, '<br>').replace(/<div><br><\/div>/g, '<br>').replace(/line-height: [0-9].[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9];/, '').replace(/ style=""/gi, '')));
                $("[data-editor-id='s" + i + "']").show();
                $("[data-editor-id='e" + i + "']").hide();
            } else {
                $("[data-editor-id='e" + i + "']").html(gzip($("[data-editor-id='s" + i + "']").val()));
                $("[data-editor-id='e" + i + "']").show();
                $("[data-editor-id='s" + i + "']").hide();
            }
        });
        $("#btnImageUpload" + i + "").ajaxUpload({
            url: "/backoffice/SayfaFileUpload",
            name: "file",
            onSubmit: function () {

            },
            onComplete: function (result) {
                if (result != '"error"') {
                    var adi = String(result).replace(/\"/g, "").split("|")[0];
                    var type = String(result).replace(/\"/g, "").split("|")[1];

                    var range = slc;
                    var newNode;
                    if (range.commonAncestorContainer.parentNode != "img") {
                        newNode = document.createElement('img');
                        newNode.setAttribute('src', '/Upload/Sayfa/' + adi);
                    }
                    range.surroundContents(newNode);
                } else {

                }
            }
        });
        $("#btnVideoUpload" + i + "").ajaxUpload({
            url: "/backoffice/SayfaFileUpload",
            name: "file",
            onSubmit: function () {

            },
            onComplete: function (result) {
                if (result != '"error"') {
                    var adi = String(result).replace(/\"/g, "").split("|")[0];
                    var type = String(result).replace(/\"/g, "").split("|")[1];

                    var range = slc;
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

        $("#btnFileUpload" + i + "").ajaxUpload({
            url: "/backoffice/SayfaFileUpload",
            name: "file",
            onSubmit: function () {

            },
            onComplete: function (result) {
                if (result != '"error"') {
                    var adi = String(result).replace(/\"/g, "").split("|")[0];
                    var type = String(result).replace(/\"/g, "").split("|")[1];

                    var range = slc;
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
        $("[data-cedit='btnLink" + i + "']").click(function (e) {
            $(this).next().next().toggle();
        });
        $("[data-cedit='link" + i + "']").click(function (e) {
            var ssl = window.getSelection();
            ssl.removeAllRanges();
            ssl.addRange(slc);
            document.execCommand('createLink', false, $("#txtLink" + i + "").val());
            $(this).parent().parent().parent().toggle();
        });

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
}
var gzip = function (t) {
    var text = t;
    for (var i = 0; i < 5; i++) {
        text = String(text).replace(/<!--([\s\S]*?)-->/mig, ' ');
        //text = String(text).replace(/\/\/.*?\/?\*.+?(?=\n|\r)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, ' ');
        text = String(text).replace(/\n/g, " ");
        text = String(text).replace(/  /g, " ");
        text = String(text).replace(/   /g, " ");
        text = String(text).replace(/    /g, " ");
        text = String(text).replace(/     /g, " ");
        text = String(text).replace(/      /g, " ");
        text = String(text).replace(/       /g, " ");
        text = String(text).replace(/        /g, " ");
        text = String(text).replace(/	/g, " ");
        text = String(text).replace(/> </g, "><");
    }
    return text;
};
var ungzip = function (t) {
    var text = t;
    text = String(text).replace(/\/>/g, "/>\n");
    text = String(text).replace(/<\/div>/g, "<\/div>\n");
    text = String(text).replace(/<\/table>/g, "<\/table>\n");
    text = String(text).replace(/<\/ul>/g, "<\/ul>\n");
    text = String(text).replace(/<\/li>/g, "<\/li>\n");
    text = String(text).replace(/<\/p>/g, "<\/p>\n");
    text = String(text).replace(/<\/script>/g, "<\/script>\n");
    text = String(text).replace(/<\/tr>/g, "<\/tr>\n");
    text = String(text).replace(/<\/td>/g, "<\/td>\n");
    text = String(text).replace(/<\/th>/g, "<\/th>\n");
    text = String(text).replace(/<\/title>/g, "<\/title>\n");
    text = String(text).replace(/></g, ">\n<");

    text = String(text).replace(/\);/g, ");\n");
    text = String(text).replace(/\};/g, "};\n");
    return text;
};
var htmlEditor = function (id, value) {
    var sourceID = $(id).attr('data-editor-id');
    $("[data-editor-id='" + sourceID + "']").val(gzip(value))
    $("[data-editor-id='" + String(sourceID).replace('s', 'e') + "']").html(gzip(value));
};
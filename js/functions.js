$(document).ready(function () {

    var species = [
        {
            id: 70110,
            text: "Alytes obstetricans"
        },
        {
            id: 70230,
            text: "Adscita alpina"
        },
        {
            id: 70230,
            text: "Adscita alpina"
        }
        ,
        {
            id: 70230,
            text: "Adscita alpina"
        }
        ,
        {
            id: 70230,
            text: "Adscita alpina"
        }
        ,
        {
            id: 70230,
            text: "Adscita alpina"
        }
        ,
        {
            id: 70230,
            text: "Adscita alpina"
        }
        ,
        {
            id: 70230,
            text: "Adscita alpina"
        }
        ,
        {
            id: 70230,
            text: "Adscita alpina"
        }
        ,
        {
            id: 70230,
            text: "Adscita alpina"
        }
    ];

    $(".js-species-data-array").select2({
        data: species
    });

    console.log("done!")

    $(".js-data-example-ajax").select2({
        ajax: {
            url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                return {
                    results: data.items,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });

    $('#rollBox').hide();
    $("#minimizebutton").hide();

    $("#minimizebutton").click(function () {
        $("#rollBox").slideToggle("fast", function () {
            $("#minimizebutton").hide();
            $("#boxtext").show();
        });
    });

    $('#footerBox').hide();
    $('#footerButton').show();
    $('#footerMinButton').hide();
    $("#footerButton").click(function () {
        $("#footerBox").slideToggle("fast", function () {
            $("#footerButton").hide();
            $("#footerTitle").hide();
            $("#footerMinButton").show();
        });
    });
    $("#footerMinButton").click(function () {
        $("#footerBox").slideToggle("fast", function () {
            $("#footerButton").show();
            $("#footerTitle").show();
            $("#footerMinButton").hide();
        });
    });
});

function showResult(str) {
    if (str.length < 3) {
        document.getElementById("livesearch").innerHTML = "";
        document.getElementById("livesearch").style.border = "0px";
        return;
    }
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            document.getElementById("livesearch").innerHTML = xhr.responseText;
        }
    }
    xhr.open("GET", "livesearch2.php?q=" + str, true);
    xhr.send();
}
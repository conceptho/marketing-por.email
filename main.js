$(function () {
    //Simulação de efeito Parallax
    $('.parallax').each(function () {
        var $obj = $(this);

        $(window).scroll(function () {
            var yPos = -($(window).scrollTop() / $obj.data('speed'));

            var bgpos = '50% ' + yPos + 'px';

            $obj.css('background-position', bgpos);
        });
    });


    //Carrega o feed com os artigos
    $.ajax({
        url: 'rss/index.xml',
        dataType: 'xml',
        // Caso tenha encontrato o arquivo, leio os dados do xml
        success: function (xml) {
            $(xml).find('channel').each(function () {
                var arrayItem = [];
                $(this).find('item').each(function () {
                    arrayItem.push(
                            [
                                {
                                    'title': $(this).find('title').text(),
                                    'link': $(this).find('link').text(),
                                    'img': $(this).find('img').text(),
                                    'author': $(this).find('author').text(),
                                    'description': $(this).find('description').text(),
                                    'pubDate': $(this).find('pubDate').text()
                                }
                            ]
                            );
                });

                //Define o destaque
                $(
                        "<a href='" + arrayItem[0][0].link + "' class='col-lg-6 col-md-6' style='display:block'>" +
                        "<h2>" + arrayItem[0][0].title + "</h2>" +
                        "<p>" + arrayItem[0][0].description + "</p>" +
                        "</a>"
                        ).appendTo(".destaque .container .col-lg-12");

                //Lista os Artigos
                for (x in arrayItem) {
                    if (x != 0) {
                        $(
                                "<article class='col-lg-3 col-md-3 col-sm-6 col-xs-12'>" +
                                "<a class='artigo' href='" + arrayItem[x][0].link + "'>" +
                                "<img src='" + arrayItem[x][0].img + "' class='img-artigo' alt='" + arrayItem[x][0].title + "'/>" +
                                "<div class='linha'></div>" +
                                "<h3>" + arrayItem[x][0].title + "</h3>" +
                                "<p>" + arrayItem[x][0].description + "</p>" +
                                "<div class='creditos'><div class='inicial-author letter-" + arrayItem[x][0].author[0].toLowerCase() + "'>" + arrayItem[x][0].author[0] + "</div><span>" +
                                arrayItem[x][0].author +
                                "</span></div>" +
                                "</a></article>"
                                ).appendTo("#conteudo");
                    }

                }
            });
        },
        error: function () {
            console.log("Ocorreu um erro inesperado durante o processamento.");
        }
    });
})
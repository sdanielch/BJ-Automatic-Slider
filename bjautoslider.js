//<![CDATA[
google.load("feeds", "1");
$(function() {
    // SLIDER ZONE
    function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}
    function formatDate(d, f) {
    var d = new Date(d);
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return f.replace(/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/gi,
function($1) {
switch ($1.toLowerCase()) {
              case 'yyyy': return d.getFullYear(); // full year, 4 digits
              case 'mmmm': return months[d.getMonth()]; // full month
              case 'mmm':  return months[d.getMonth()].substr(0, 3); // month abbreviated
              case 'mm':   return (d.getMonth() + 1); // month numerical value
              case 'dddd': return days[d.getDay()]; // full day
              case 'ddd':  return days[d.getDay()].substr(0, 3); // day abbreviated
              case 'dd':   return d.getDate(); // day numerical value
              case 'hh':   return ((h = d.getHours() % 12) ? h : 12); // hour value
              case 'nn':   return d.getMinutes(); // minute value
              case 'ss':   return d.getSeconds(); // second value
              case 'a/p':  return d.getHours() < 12 ? 'a' : 'p'; // am or pm
}
}
);
}
    function initialize() {
      var feed = new google.feeds.Feed("http://www.gisp.tk/feeds/posts/default");
      feed.setNumEntries(8);
      feed.load(function(result) {
        if (!result.error) {
            // Si conseguimos acceder al feed y leerlo...
          console.log("Cargando el Feed");
          var container = document.getElementById("slider");
            // Eliminamos el mensaje de cargando
            $("#slider").empty();
            // Cargamos cada uno de los resultados
            for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            $("<li class=\"entry entry"+i+"\" ></li>").appendTo("#slider");
              // Si el título se pasa de 50 carácteres lo acortamos y ponemos puntos suspensivos
            var entryTitle = entry.title;
               if (entryTitle.length > 100) {
                var entryTitle = entryTitle.substring(0,100)+'...';
               }
            $("<a href='"+entry.link+"'>"+entryTitle+"</a>").addClass("slidertitle").appendTo(".entry"+i);
            $("<span>"+ entry.contentSnippet +"</span>").addClass("slidertext").appendTo(".entry"+i);
            // Detección de imágenes
            var entryImage = $(entry.content).find('img').eq(0);
            var urlIMG = $(entryImage).attr("src");
            // Comprobamos si tiene imagenes
            if ( $(entryImage).length ) {
            $(".entry"+i).css({
                "background-image" : "url("+urlIMG+")",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover"
                });
            } else {
            $("<img src='IMAGENNODEFINIDA' />").addClass("sliderimage").appendTo(".entry"+i);
            }

            // Preformateamos la fecha de la entrada
            var dateFormat = 'dd mmmm de yyyy';
            var entryDate = formatDate(entry.publishedDate, dateFormat);
            // Insertamos la fecha de la entrada
            $("<span>"+entryDate+"</span>").addClass("sliderfecha").appendTo(".entry"+i);
            // Mostramos por consola la entrada que hemos cargado
            console.log("Entrada con index "+ i +" cargada.");
            }
            // Una vez cargados los resultados...
            console.log("Entradas leidas correctamente");
            // Movemos toda la información a una variable
            var infoslider = $("#slider").html();
            // Incluimos UL para hacer el listado
            infoslider = "<ul class='bjqs'>"+ infoslider + "</ul>";
            // Refrescamos el contenido del slider
            $("#slider").html(infoslider);
            // Ahora le damos forma al slider con un plugin externo

            $('#slider').bjqs({
                width : 600,
                height : 180,
                animtype : 'slide',
                animduration : 450,
                animspeed : 4000,
                automatic : true,
                showcontrols : true,
                centercontrols : true,
                nexttext : '<i class="fa fa-arrow-circle-right"></i>',
                prevtext : '<i class="fa fa-arrow-circle-left"></i>',
                showmarkers : true,
                centermarkers : true,
                keyboardnav : true,
                hoverpause : true,
                usecaptions : false,
                randomstart : false,
                responsive : false
            });
            // Preformateamos el paginador
            $(".bjqs-markers li a").each(function(){
            $(this).html(' <i class="fa fa-dot-circle-o"></i> ');
            });

        } else {
            // En caso de que haya ocurrido algún problema al cargar el feed...
            console.log("Ha ocurrido un error al cargar el Feed.")}
      });
    }
    google.setOnLoadCallback(initialize);
    // SLIDER ZONE


});
//]]>

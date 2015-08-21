//<![CDATA[

function paginator(x) {
// Primero observamos qué contenedor está siendo visible y lo leemos como un número

var a = $('#updates div:first-child').attr("id").replace("entryItem", "");
// Luego oscurecemos todos los TD que hay menos el que coincida en número con el div visible
$("#paginator td").addClass("paginator-a")
$("#paginator td").removeClass("paginator-e")
$(".feedThumb").removeClass("anim")
$("#paginator td").eq(a).removeClass("paginator-a")
$("#paginator td").eq(a).addClass("paginator-e")
$('#updates div:nth-child(1) img.feedThumb').addClass("anim")

var pausesrc = $('#pause').attr("src")
if (pausesrc == "http://etc-mysitemyway.s3.amazonaws.com/icons/legacy-previews/icons/simple-red-square-icons-media/129102-simple-red-square-icon-media-a-media22-arrow-forward1.png") {
       $("#updates div:nth-child(1) img.feedThumb").pauseKeyframe();

} else {$("#updates div:nth-child(1) img.feedThumb").resumeKeyframe();}


var supportedFlag = $.keyframe.isSupported();
  if (supportedFlag == true) {
    function devancho() {
    var devpic = $('#updates div:nth-child(1) img.feedThumb').height();
    var devdiv = $('#updates').height();
	// OP
	var devop1 = devpic * -1
	var devop2 = devop1 + devdiv
	return devop2
    }
var devpos = devancho()
// Para hacer la animación es necesario que el punto de partida de cada imagen sea el punto final de la animación
// como cada imagen puede contener un alto distinto necesitamos calcular hasta donde se ha de situar TOP para que la
// animación no se exceda, en cada pasada recalculamos y damos un valor distinto al keyframe, de esta forma da la
// sensación de que cada imágen de la pancarta tiene su propio keyframe cuando es calculado automáticamente.
$('#updates div:nth-child(1) img.feedThumb').css("top", devpos+"px");
// con los resultados anteriores, ponemos en marcha el keyframe y lo activamos más adelante por css, en cada pasada
// el valor del keyframe es distinto ya que se recalcula automaticamente. (asi podemos poner imagenes con distintos
// altos sin tener que hacer un keyframe para cada una)
$.keyframe.define({
    name: 'ball-roll',
    from: {
        'top': '0px'
    },
    to: {
        'top': devpos+"px"
    }
});

// Para dar un efecto de pausa con el raton
$( "#updates" ).mouseover(function() {
//$("#updates div:nth-child(1) img.feedThumb").pauseKeyframe();
});

$( "#updates" ).mouseout(function() {
//$("#updates div:nth-child(1) img.feedThumb").resumeKeyframe();
});

  } else {
console.log("Su navegador NO soporta animaciones CSS3");
  }



}


// Escogemos el Feed del blog
var feedURL = 'http://www.gisp.tk/feeds/posts/default';
// Seleccionamos el número de entradas
var numEntries = 8;
// Ponemos el formato de la fecha
var dateFormat = 'dd mmmm de yyyy';
// Ponemos donde cargar el RSS
var targetLocation = '#updates';
// Ponemos 1 si queremos cargar las imagenes 0 si solo queremos cargar el texto
var imageThumbnails = 1;
// Ponemos el ancho deseado de las imagenes (No tocar)
var imageThumbnailWidth = 200;
// Recortar imagines 1 SI 0 NO
var imageThumbnailCrop = 1;
// Limitar caracteres de la descripcion
var blurbLength = 25;
// Enlace a la entrada
var blurbContinue = '...'

if (imageThumbnailCrop) {
var imageVar = 's' + imageThumbnailWidth + '-c';
} else {
var imageVar = 's' + imageThumbnailWidth;
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

google.load("feeds","1");



var autoslider = setInterval(function(){
   $('#updates div:first-child').hide(500).delay(500)
         .next('div').fadeIn(500)
         .end().appendTo('#updates');paginator();
        }, 8000);



function displayFeed(){
console.log('Accediendo al Feed del Slider...');
var feed = new google.feeds.Feed(feedURL);
feed.setNumEntries(numEntries)
feed.load(function(result) {
        if (!result.error) {
console.log('Acceso correcto, procesando entradas...');
for (var i = 0; i < result.feed.entries.length; i++) {
console.log('Precesando entrada #' + i);
var entry = result.feed.entries[i];
var entryID = "entryItem" + i;
var entryURL = entry.link;
var entryTitle = entry.title;
var entryContent = $('<div>').html(entry.content);
var entryDate = formatDate(entry.publishedDate, dateFormat);
var imageReg = /s\B\d{3,4}/;
var entryImage = entryContent.find('a img').first(); // there might be issues here due to the tracking image placed into the feed by Google
var entryBlurb = entryContent.text().split(' ').slice(0,blurbLength).join(' ') + blurbContinue;
  $(targetLocation).append($('<div>').attr('id',entryID).attr('class','ab1'));

  if (entryTitle.length > 50) {
 var entryTitle = entryTitle.substring(0,50)+'...';
}

$('<h5>').addClass('feedh5').append($('<a>').attr('href',entryURL).text(entryTitle)).appendTo("#"+ entryID);

function greet( event ) {
window.location.href = event.data.name;
}

function paginator2( event2 ) {
console.log("");
console.log("");
var pico1 = event2.data.name //Nos dice el boton que pulsamos
var pico2 = $('#updates div:first-child').attr("id"); //Nos dice la pancarta activa
var pico3 = event2.data.imagen
var pico4 = pico1.replace("entryItem","")
console.log("Se ha pulsado el botón "+pico4+" del paginador, comprobando posición...");


  function comprobar(a){
  var c = $('#updates div:first-child').attr("id"); //Nos dice la pancarta activa
  if (a != c) {
  var b = a.replace("entryItem", "");
  var d = c.replace("entryItem", "");
  console.log("Los elementos Boton:" +b+ " y Pancarta:" +d+" no coinciden, iniciando búsqueda...");
  var posa = $('#updates div:first-child').attr("id");
  var posa2 = posa.replace("entryItem", "")
  var posb = b
  if (posa2 < posb) {
      console.log("El elemento requerido está despues del elemento activo, iniciando búsqueda hacia la derecha...");
      clearInterval(autoslider); //Paramos el contador automático
        $('#updates div:first-child').hide(0).delay(0)		// Recorremos el slider
       .next('div').show(0)									//
       .end().appendTo('#updates');							//
       paginator();
  } else {
  console.log("El elemento requerido esta antes del elemento activo, iniciando búsqueda hacia la izquierda...");
  clearInterval(autoslider);
  $('#updates div:first-child').hide(0).delay(0);
  $('#updates div:last-child').show(0).prependTo('#updates');paginator();
  }



										// Sincronizamos con el paginador
    } else {
    clearInterval(minecraft);
console.log("");
    console.log("Los elementos coinciden, búsqueda finalizada.");}
  }

 var minecraft=setInterval(function () {comprobar(pico1)}, 0);


}


$('<span>').addClass('lbrightness').attr('id',"lb-" + entryID).on( "click", {name: entryURL}, greet ).appendTo("#"+ entryID);
$('<span>').addClass('brightness').attr('id',"b-" + entryID).appendTo("#"+ entryID);


if (entryImage.attr('src')){
var entryImageURL = entryImage.attr('src').replace(imageReg,imageVar);
$('<a>').attr('href',entryURL).append($('<img>').addClass('feedThumb').attr('src',entryImageURL)).appendTo('#'+ entryID);

function greet2( event ) {
alert(event.data.name);
}

}
  else {
// Si no encuentra ninguna imágen en el post usamos una para rellenar
var entryImageURL = "https://932b6a7a19c90844616925166ce716f37c43b027.googledrive.com/host/0B_JufudtenaCTE9rWVFXN21jdk0/notfound.jpg"


$('<a>').attr('href',entryURL).append($('<img>').addClass('feedThumb').attr('src',entryImageURL)).appendTo('#'+ entryID);
}






// Cargamos el paginador
$("#paginator").show();
var p1 = entryID.replace("entryItem", "")
$('#paginator').append($('<td>').attr('class',"p"+p1).on( "click", {name: entryID, imagen: entryImageURL}, paginator2 ));
// Numeramos cada boton del paginador

// Aplicamos un fondo personalizado a cada TD
var styles2 = {
      background: "url("+entryImageURL+") no-repeat",
      };

//$('#paginator .p' + p1).css(styles2);





$('<p>').addClass('feedBlurb').text(entryBlurb).appendTo('#'+ entryID);
$('<span>').addClass('feedDate').text(entryDate).appendTo('#'+ entryID);

$('#updates div:gt(0)').hide(0, paginator);
$('#cslider').hide();
var vis = $("#updates").is(":visible")
if (vis == true ) {
$("#pause").show();
$('#iralante').show();
$('#iratras').show();
  }
else{
$("#pause").hide();
$('#iralante').hide();
$('#iratras').hide();
 }


$('#updates').height(175+"px");



}
        } else console.log('Error cargando el Slider.');
});
}

google.setOnLoadCallback(displayFeed);
$(function(){

$( "#iratras" ).click(function() {
console.log("Se ha pinchado el boton de ir hacía la izquierda en Slider");
clearInterval(autoslider);
$('#updates div:first-child').fadeOut(500).delay(0);
$('#updates div:last-child').fadeIn(500).prependTo('#updates');paginator();

var pausesrc = $('#pause').attr("src")
if (pausesrc == "http://etc-mysitemyway.s3.amazonaws.com/icons/legacy-previews/icons/simple-red-square-icons-media/129102-simple-red-square-icon-media-a-media22-arrow-forward1.png") {
       $("#updates div:nth-child(1) img.feedThumb").pauseKeyframe();

    } else {$("#updates div:nth-child(1) img.feedThumb").resumeKeyframe();}

});

$( "#iralante" ).click(function() {
console.log("Se ha pinchado el boton de ir hacía la derecha en Slider");
clearInterval(autoslider);
   $('#updates div:first-child').fadeOut(500).delay(500)
         .next('div').fadeIn(500)
         .end().appendTo('#updates'); paginator();

var pausesrc = $('#pause').attr("src")
if (pausesrc == "http://etc-mysitemyway.s3.amazonaws.com/icons/legacy-previews/icons/simple-red-square-icons-media/129102-simple-red-square-icon-media-a-media22-arrow-forward1.png") {
       $("#updates div:nth-child(1) img.feedThumb").pauseKeyframe();

} else {$("#updates div:nth-child(1) img.feedThumb").resumeKeyframe();}


});

  $("#pause").click(function() {
  $("#updates div:nth-child(1) img.feedThumb").pauseKeyframe();

var pausesrc = $('#pause').attr("src")

    if (pausesrc == "http://www.bluerockfoundation.org/wp-content/uploads/2012/05/pause2.png") {
     clearInterval(autoslider);

       $('#pause').attr("src", 'http://etc-mysitemyway.s3.amazonaws.com/icons/legacy-previews/icons/simple-red-square-icons-media/129102-simple-red-square-icon-media-a-media22-arrow-forward1.png');

    } else {

    $("#updates div:nth-child(1) img.feedThumb").resumeKeyframe();
    $('#pause').attr("src", 'http://www.bluerockfoundation.org/wp-content/uploads/2012/05/pause2.png');


}


  });

$('#iratras').appendTo('#updates2');
$('#iralante').appendTo('#updates2');
$('#paginator').appendTo('#updates2');


});
//]]>

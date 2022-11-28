// Dani Vicario - experimento nasaExoplanets (tresjs) - miércoles 23 de febrero de 2022 18:58:41 CET
dejar  cámara ;
dejar  escena ;
dejar  renderizador ;
dejar  geometría ;
dejar  material ;
dejar  malla ,  malla2 ;
let  planetMesh  =  [ ] ;
let  planetData ;
let  totalPlanets  =  8 ;
función  inicializar ( )  {
  cámara  =  nuevo  TRES . PerspectiveCamera ( 50 ,  ventana . ancho interior  /  ventana . altura interior ,  0.01 , 1 000  000 ) ;
  cámara _ posición _ z  =  1 ;

  escena  =  nuevo  TRES . Escena ( ) ;

   calidad  constante =  70 ;

  sea  ​​planetScale  =  d3
    . escalaLineal ( )
    . dominio ( [ datos del planeta [ datos del planeta . longitud  -  1 ] . radio ,  datos del planeta [ 0 ] . radio ] )
    . rango ( [ 0.2 ,  2 ] ) ;

  for  ( sea  i  =  0 ;  i  <  planetastotales ;  i ++ )  {
    consola _ log ( planetaData [ i ] .radio ) ; _
    textura  =  nuevo  TRES . Cargador de texturas ( ) . cargar ( `planetaTexturas/textura ${ i  +  1 } .jpg` ) ;
    geometría  =  nuevo  TRES . SphereGeometry ( planetScale ( planetData [ i ] . radio ) ,  calidad ,  calidad ) ;
    material  =  nuevo  TRES . MeshBasicMaterial ( {  mapa : textura  } ) ;
    planetMesh [ i ]  =  TRES nuevos  . Malla ( geometría , material ) ; 

    PlanetMesh [ yo ] . posición _ x  =  yo  *  4 ;

    escena _ add ( planetaMalla [ i ] ) ;
  }

  renderizador  =  nuevo  TRES . WebGLRenderer ( {  antialias : verdadero  } ) ;
  renderizador _ setSize ( ventana.interiorAncho , ventana.interiorAltura ) ; _ _  _ _
  renderizador _ Factor gamma  =  2.2 ;
  renderizador _ Salida gamma  =  verdadero ;
  documento _ cuerpo _ appendChild ( procesador . domElement ) ;

  controles  =  nuevo  TRES . OrbitControls ( cámara ,  renderizador . domElement ) ;
  //controles.addEventListener('cambiar', renderizar); // llame a esto solo en escenas estáticas (es decir, si no hay un ciclo de animación)
  controles _ enableDamping  =  verdadero ;  // se requiere un bucle de animación cuando la amortiguación o la rotación automática están habilitadas
  controles _ factor de amortiguamiento  =  0.25 ;
  // controles.screenSpacePanning = false;
  // controles.minDistance = 100;
  // controles.maxDistance = 500;
  controles _ maxPolarAngle  =  Matemáticas . IP  /  2 ;
}

función  animar ( )  {
  requestAnimationFrame ( animar ) ;

  for  ( sea  i  =  0 ;  i  <  planetMesh . length ;  i ++ )  {
    PlanetMesh [ yo ] . rotación _ y  +=  0.01  /  5 ;
  }

  cámara _ posición _ x  +=  0,01  /  2 ;

  // malla.rotación.x += 0.01;
  // malla.rotación.y += 0.02 / 6;
  // malla2.rotación.x -= 0.02 / 6;
  // malla2.rotación.y += 0.02 / 6;

  renderizador _ renderizar ( escena ,  cámara ) ;
}

function  randomFloat ( min ,  max )  {
  devolver  Matemáticas . aleatorio ( )  *  ( max  -  min )  +  min ;
}
function  randomInt ( min ,  max )  {
  devolver  Matemáticas . piso ( Math . random ( )  *  ( max  -  min  +  1 )  +  min ) ;
}
función  barajar ( matriz )  {
   matriz de retorno . sort ( ( )  =>  Math . random ( )  -  0.5 ) ;
}

función  agregar campo estelar ( )  {
  var  geometría  =  nuevo  TRES . Geometría de esfera ( 4000 ,  100 ,  100 ) ;
  var  veryBigSphereForStars  =  new  TRES . Malla ( geometría ,  indefinida ) ;

  muyGranEsferaParaEstrellas . geometría _ vértices
    . filtro ( ( x )  =>  Matemáticas . aleatorio ( )  >  0.5 )
    . paraCada ( ( starCoords )  =>  {
      const  geometría  =  nueva  TRES . SphereGeometry ( 5 ,  3 ,  3 ) ;
      const  material  =  nuevo  TRES . MallaMaterialBásico ( {
        color : `rgb (255, 255, 255)` ,
        transparente : cierto ,
        opacidad : matemáticas . aleatorio ( )
      } ) ;
      const  estrella  =  nuevo  TRES . Malla ( geometría ,  material ) ;

      estrella _ posición _ x  =  coordenadas estelares . x  +  flotador aleatorio ( -100 , 100 ) ; 
      estrella _ posición _ y  =  coordenadas estelares . y  +  flotador aleatorio ( - 100 ,  100 ) ;
      estrella _ posición _ z  =  coordenadas estelares . z  +  flotador aleatorio ( - 100 ,  100 ) ;

      escena _ añadir ( estrella ) ;
    } ) ;

  escena _ add ( muyGranEsferaParaEstrellas ) ;
}

/**
* Recuperar un número fijo de elementos de una matriz, distribuidos uniformemente pero
* siempre incluyendo el primer y último elemento.
*
* @param    { Array } items - La matriz sobre la que operar.
* @param    { number } n - El número de elementos a extraer.
* @devoluciones { Matriz }
*/
función  copia distribuida ( elementos ,  n )  {
  var  elementos  =  [ elementos [ 0 ] ] ;
  var  totalItems  =  artículos . longitud  -  2 ;
   intervalo  var =  Matemáticas . suelo ( artículostotales  /  ( n  -  2 ) ) ;
  para  ( var  i  =  1 ;  i  <  n  -  1 ;  i ++ )  {
    elementos _ empujar ( elementos [ i  *  intervalo ] ) ;
  }
  elementos _ empujar ( artículos [ artículos . longitud  -  1 ] ) ;
  devolver  elementos ;
}

( función asíncrona  ( ) {  
  let  planetsVisited  =  0 ;
  const  planetsData  =  await  fetch ( "http://127.0.0.1:8080/exoplanetsFiltered.json" ) ;
  planetData  =  espera  planetsData . json ( ) ;
  ventana _ onkeydown  =  ( tecla )  =>  {
    if  ( tecla . tecla  ===  "d" )  {
      documento _ querySelector ( "#planeta" ) . innerHTML  =  planetData [ planetsVisited ] . nombre ;
      planetasVisitados ++ ;
    }
  } ;

  // depurador;
  // planetData = copia distribuida (planetData, totalPlanets);
  datosplaneta  =  [ ... datosplaneta . empalme ( 0 ,  totalPlanets ) ] ;

  inicializar ( ) ;
  agregar campo estelar ( ) ;
  animar ( ) ;
} ) ( ) ;
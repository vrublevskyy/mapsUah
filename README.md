#### mapsUah

Página para la administración de la aplicación.

##### ./

* index.html: pagina principal de la aplicación
* addItem: pagina para añadir una facultad
* manage.html: pagina de gestion de una facultad (actualizar, eliminar)

##### ./js

* geo: tiene los metodos para gestionar el mapa y todo lo relacionado con ello. 
  Utiliza el modulo polyline para decodificar la respuesta del servidor osrm.
* page.js: genera la lista de las facultades disponibles para administrar, recoge los datos en el servidor nodejs de la branch master
* manage.js: contiene los metodos para las operaciones de actualización, añadir nuevos elementos o eliminarlos.


##### ./webServer.js

Un servidor muy simple (no siempre funcióna, se utiliza para pruebas rápidas)

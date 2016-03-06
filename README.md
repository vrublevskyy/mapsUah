### mapsUah
Branch para la parte servidor de la aplicación. Es independiente de los clientes (clientAdmin y clientUser)

Estructura de los directorios:

##### controllers

Contiene el controlador para las facultades. 
Los metodos publicos son los siguientes:
* addFacultad
* getAllFacultades
* findByName
* findById
* remove
* updateFacultad

Todas las funciónes permiten pasar un callback que se ejecutara al finalizar la llamada.

##### models

Es el modelo de datos que describe la facultad en el formato geoJSON.

##### index.js

El modulo principal. Utiliza mongoose para conectarse a mongo y express para el servidor y las rutas.

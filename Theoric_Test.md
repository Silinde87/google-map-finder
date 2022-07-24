## Theoric Issue
El principal problema que tiene la implementación del RegisteredUsed es que para realizar el cálculo depende demasiado de hacer el match con el ```typeof service```. En un approach ideal, el servicio debería ser capaz de devolver el ``total`` en función de los parámetros de la request:

```javascript
class RegisteredUser{
    constructor(services = []){
        this.services = services;
    }

    getTotal(parameters){
        let total = 0;
        this.services.forEach(service, index => {
            let multimediaContent = service.getMultimediaContent(parameters);

            total += multimediaContent.total;
        })
        return total;
    }
}
```


En caso de no ser esto posible, otra posible solución es que, en función de unos parámetros pasados, el servicio devuelva el tipo el precio según el tipo de servicio utiliazado por el usuario, y el additionalFee por el otro lado, de esta forma el cálculo lo realiza el getTotal:

```javascript
class RegisteredUser{
    constructor(services = []){
        this.services = services;
    }

    getTotal(parameters){
        let total = 0;
        this.services.forEach(service, index => {
            let multimediaContent = service.getMultimediaContent(parameters);

            total += multimediaContent.servicePrice + multimediaContent.additionalFee;
        })
        return total;
    }
}
```

En caso de no ser posible realizar estas modificaciones en el servicio, creando una constante con los nombres de los servicios, el getTotal sería totalmente transparente a lo que le devuelva el servicio. Solo habría que actualizar la constante ``servicePriceNamesByServiceType`` si se añadieran nuevos tipos de servicios:


```javascript

const servicePriceNamesByServiceType = {
    StreamingService: "streamingPrice",
    DownloadService: "downloadPrice",
}

class RegisteredUser{
    constructor(services = []){
        this.services = services;
    }

    getTotal(){
        let total = 0;
        this.services.forEach(service, index => {
            const multimediaContent = service.getMultimediaContent();

            const serviceType = typeof service;
            const servicePriceName = servicePriceNamesByServiceType[serviceType]
            total += multimediaContent[servicePriceName] + multimediaContent.additionalFee;
        })
        return total;
    }
}
```
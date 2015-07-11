MiriadaX Trabajo Practico QUIZ
============

Descripcion

* [Debug On/Off](#Debug)
* [Ejecucion](#Ejecucion)
* [Creacion Certificados SSL](#SSL)

### Debug

```bash
Set debug On Windows
	c:>set DEBUG=quiz:server // Windows
	# DEBUG=quiz:server // Unix
```

### Ejecucion

```bash
# foreman start -p 80 <- Arranca en el puerto 80
```
 
### Ejecucion

```bash
# mkdir certs
# cd certs
# openssl genrsa -out quiz-2015-key.pem 2048
# openssl req -new -sha256 -key quiz-2015-key.pem -out quiz-2015-csr.pem
# openssl x509 -req -in quiz-2015-csr.pem -signkey quiz-2015-key.pem -out quiz-2015-cert.pem
```

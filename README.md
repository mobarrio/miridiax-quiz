MiridiaX Trabajo Practico QUIZ
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
D:\Dropbox\Mariano\miriadax\ejercicios\quiz>mkdir certs

D:\Dropbox\Mariano\miriadax\ejercicios\quiz>cd certs

D:\Dropbox\Mariano\miriadax\ejercicios\quiz\certs>openssl genrsa -out quiz-2015-key.pem 2048
Generating RSA private key, 2048 bit long modulus
..................+++
.....................................................+++
e is 65537 (0x10001)

D:\Dropbox\Mariano\miriadax\ejercicios\quiz\certs>openssl req -new -sha256 -key quiz-2015-key.pem -out quiz-2015-csr.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:ES
State or Province Name (full name) [Some-State]:Islas Baleares
Locality Name (eg, city) []:Palma de Mallorca
Organization Name (eg, company) [Internet Widgits Pty Ltd]:MiriadaX
Organizational Unit Name (eg, section) []:Curso de NodeJS
Common Name (e.g. server FQDN or YOUR name) []:Mariano J. Obarrio Miles
Email Address []:mariano.obarrio@gmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:MiriadaX

D:\Dropbox\Mariano\miriadax\ejercicios\quiz\certs>openssl x509 -req -in quiz-2015-csr.pem -signkey quiz-2015-key.pem -out quiz-2015-cert.pem
Signature ok
subject=/C=ES/ST=Islas Baleares/L=Palma de Mallorca/O=MiriadaX/OU=Curso de NodeJS/CN=Mariano J. Obarrio Miles/emailAddress=mariano.obarrio@gmail.com
Getting Private key
```

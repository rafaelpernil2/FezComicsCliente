# FezComicsCliente
An Ionic 4 web application designed for a cartoonist to manage his/her Comics and Series
## Table of Contents
- [Software Requirements Specification](#software-requirements-specification)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)
## Software Requirements Specification
It will be uploaded at some point to serve as a reference.
## Installation
**Requirements:**
* [**Docker**](https://www.docker.com/)
* [**rafelpernil2/FezComicRESTPy**](https://github.com/rafaelpernil2/FezComicRESTPy)

***Additional requirements without using Docker:***
* [**Node.js**](https://nodejs.org/)

**Steps without Docker:**

Install Ionic 4
```
$ npm install -g ionic@latest
```
Go to the folder where you cloned this repository and install the dependencies
```
$ npm install
```

**Steps using Docker:**

Simply build the container
```
$ docker build -t <some-tag> .
```

## Usage
**Usage without Docker**

Deploy in local using the following command
```
$ ionic serve
```

**Usage with Docker**

Run the created container
```
$ docker run -p 8100:8100 -d <some-tag>
```

## Contributing
There is no plan regarding contributions in this project
## Credits
This web application has been developed by the following team:

**Francisco Gambero Salinas**- *Front-End Developer*

* [github/takox](https://github.com/Takox)

**Jesus Contreras Herrera**- *Back-End Developer*

* [github/JCH611](https://github.com/JCH611)

**Francisco Sánchez Rueda**- *Front-End Development Lead*

* [github/fsanchezsw](https://github.com/fsanchezsw)

**Rafael Pernil Bronchalo** - *Software Architect, Back-End Development and Design Lead* 

* [github/rafaelpernil2](https://github.com/rafaelpernil2)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

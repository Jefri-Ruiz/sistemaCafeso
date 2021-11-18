create database cafeso;

create table Usuario (
    matricula serial primary key,

    tipoUsuario varchar (15) not null check (tipoUsuario = 'Administrador' OR tipoUsuario = 'Colaborador'),

    password varchar(50) not null,
    nombre varchar(50) not null,
    apellidoPaterno varchar(50) not null,
    apellidoMaterno varchar(50) not null
); 

--Catalogo proveedor:
create table Proveedor (
    idProveedor serial primary key,
    razonSocial varchar(100) not null,
    rfc varchar(13) not null unique,
    telefono varchar(10) not null,
    correo varchar(50) not null,
    direccion text
);

--Catalogo de clientes:
create table Cliente (
    idCliente serial primary key,
    telefono varchar(10),
    correo varchar(50),
    nombre varchar(50) not null,
    apellidoPaterno varchar(50) not null,
    apellidoMaterno varchar(50) not null,
    rfc varchar(13)
);

--Catalogo de producto:
create table Producto (
    sku smallint primary key,
    descripcion varchar(50) not null,
    precioUnitario numeric(10,2) not null check(precioUnitario >= 0),
    iva numeric(3) not null check(iva >= 0 and iva <= 100) default 16,
    precioPublico numeric(10,2),
    stockSistema integer not null,
    valorAlmacen numeric(10,2)
);

create table Inventario (
    idInventario smallint primary key,
    fecha date not null default current_date,
	hora time not null default current_time(2),
    sku smallint not null,
    descripcion varchar(50) not null,
    stockSistema integer not null,
    stockFisico integer not null,
    precioUnitario numeric(10,2) not null check(precioUnitario >= 0)
);

create table insumo(
    sku smallint primary key,
    descripcion varchar(50) not null,
    costoUnitario numeric(10,2) not null check(costoUnitario >= 0),
    unidadMedida varchar(50) not null,
    stockSistema integer not null,
    valorAlmacen numeric(10,2)
);

create table Entrada (
    folio varchar primary key,
    sku integer not null references insumo, 
    idProveedor smallint references Proveedor,
    fecha date not null default current_date,
    hora time not null default current_time,
    cantidad integer not null check(cantidad >= 0),
    costoUnitario numeric(10,2) not null check(costoUnitario >= 0),
    costoTotal numeric(10,2)
);

create table Salida (
    folio varchar primary key,
    sku integer not null references Producto,
    idCliente smallint references Cliente,
    fecha date not null default current_date,
    hora time not null default current_time,
    cantidad integer not null check(cantidad >= 0),
    precioPublico numeric(10,2) not null check(precioPublico >= 0),
    descuento numeric(3) not null check(descuento >= 0 and descuento <= 100),
    montoTotal numeric(10,2)
);


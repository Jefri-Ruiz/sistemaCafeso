CREATE DATABASE cafeso

create table Usuario (
    matricula smallint primary key,
    password varchar(50) not null,
    nombre varchar(50) not null,
    apellidoPaterno varchar(50) not null,
    apellidoMaterno varchar(50) not null
); 

--Catalogo proveedor:
create table Proveedor (
    idProveedor smallserial primary key,
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
    precioUnitario numeric(10,2) not null check(precioUnitario >= 0), --Costo del producto sin IVA
    iva numeric(3) not null check(iva >= 0 and iva <= 100) default 16, --IVA (16%) modificacion: no puedes declarar 2 espacios despues de un punto cuando estas poniendo default "16"
    precioPublico numeric(10,2), -- Costo mas IVA modificacion: no puedes declarar "not null", si este sera calculado por la BD
    stockSistema integer not null,
    valorAlmacen numeric(10,2) -- precioPublico por stockSistema  modificacion: no puedes declarar "not null" si este sera calculado por la BD
);

create table Inventario (
    idInventario int primary key, -- no puede ser serial asi que le puse int
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
    costoUnitario numeric(10,2) not null check(costoUnitario >= 0), --Costo del producto sin IVA
    unidadMedida varchar(50) not null, -- indica si es Pieza, paquete, kilos o quintales
    stockSistema integer not null,
    valorAlmacen numeric(10,2) -- precioPublico por stockSistema  
);

create table Entrada (
    folio serial primary key,
    sku integer not null references insumo, 
    idProveedor smallint references Proveedor,
    fecha date not null default current_date,
    hora time not null default current_time,
    cantidad integer not null check(cantidad >= 0),
    costoUnitario numeric(10,2) not null check(costoUnitario >= 0),
    costoTotal numeric(10,2)
);

create table Salida (
    folio serial primary key,
    sku integer not null references Producto,  -- problema al intentar eliminar desde la tabla producto, dado a que esta referenciado
    idCliente smallint references Cliente,
    fecha date not null default current_date,
    hora time not null default current_time,
    cantidad integer not null check(cantidad >= 0),
    precioPublico numeric(10,2) not null check(precioPublico >= 0),
    descuento numeric(3) not null check(descuento >= 0 and descuento <= 100),
    montoTotal numeric(10,2)
);


insert into Usuario values (1, 'unach', 'john', 'de leon', 'faugier');
insert into Usuario values (2, 'unach', 'jefri', 'ruiz', 'espinoza');
insert into Usuario values (3, 'unach', 'juan', 'barrientos', 'mazariegos');



insert into Proveedor values (DEFAULT, 'cafe tacana sa de cv', 'XAXX010101000', '9621234567', 'ventas@cafetacana.com', 'Carretera nueva alemania km 3');
insert into Proveedor values (DEFAULT, 'cafe soconusco sa de cv', 'XAXX010101001', '9621234567', 'ventas@cafesoconusco.com', 'Carretera nueva alemania km 8');



insert into Cliente values (DEFAULT, '9621234567', 'daniel@gmail.com', 'Daniel', 'Perez', 'Ramirez');
insert into Cliente values (DEFAULT, '9621234567', 'angel@hotmail.com', 'Angel', 'Sanchez', 'Cordero');
insert into Cliente values (DEFAULT, '9621234567', 'roberto@hotmail.com', 'Roberto', 'Sanchez', 'Lopez');



--PROBADO Y APLICADO TRIGGER EN BD
insert into producto (sku, descripcion, precioUnitario, stockSistema) values (1, 'Bolsa de cafe molido de 500gr', 140, 200);
insert into producto (sku, descripcion, precioUnitario, stockSistema) values (2, 'Bolsa de cafe tostado de 500gr', 135, 56);
insert into producto (sku, descripcion, precioUnitario, stockSistema) values (3, 'Quintal de cafe arabe exportacion', 160, 30);


-- modifique primer campo que decia DEFAULT  por 11 y 12
insert into Inventario values (001, DEFAULT, DEFAULT, 1, 'Bolsa de cafe molido de 500gr', 100, 43, 160.0);
insert into Inventario values (002, DEFAULT, DEFAULT, 4, 'Cafe arabico exportacion', 30, 2, 160.0);



insert into insumo values (4, 'Cafe arabico exportacion', 160.00, 'Quintal', 30);
insert into insumo values (5, 'Cafe barroco exportacion', 230.00, 'Quintal', 70);


-- Se cambio idProveedor de DEFAULT a 11 y 12 respectivamente
insert into Entrada (folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario) values (DEFAULT, 5, 11, DEFAULT, DEFAULT, 20, 230);
insert into Entrada (folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario) values (DEFAULT, 4, 12, DEFAULT, DEFAULT, 20, 160);


insert into Salida (folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento) values (DEFAULT, 1, 16, DEFAULT, DEFAULT, 10, 162.40, 10);


/* PRODUCTO */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_precioPublico() RETURNS trigger AS
'
DECLARE
PI decimal;
Va decimal;

BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(new.sku IS NOT NULL) THEN

      PI := (select ((select iva from producto where sku = new.sku)/100)*preciounitario+preciounitario from producto where sku = new.sku);
      update producto set preciopublico = PI where sku = NEW.sku;

      Va := (select preciopublico * stocksistema from producto where sku = new.sku);
      update producto set valoralmacen = Va where sku = new.sku;
      return NEW;
      
   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger accion_calcularPreciopublico after insert or update on producto 
for each row execute procedure calculo_precioPublico();


/* INSUMOS */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_valorAlmacenI() RETURNS trigger AS
'
DECLARE
Va decimal;
BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(new.stocksistema IS NOT NULL) THEN
      Va := (select costounitario*stocksistema from insumo where sku = new.sku);
      update insumo set valoralmacen = Va where sku = NEW.sku;
      return NEW;
   END IF;
END;
' LANGUAGE plpgsql;
-- trigger  --
create trigger accion_calcularValoralmacenI after insert or update on insumo  
for each row execute procedure calculo_valorAlmacenI();

/* INVENTARIOS */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_inventarios() RETURNS trigger AS
'
DECLARE
skuProducto smallint;
skuInsumo smallint;
invProducto integer;
invInsumo integer;
vAlmacenP decimal;
vAlmacenI decimal;

BEGIN
   skuProducto := (select sku from producto where sku = new.sku);
   skuInsumo := (select sku from insumo where sku = new.sku);
   
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;

   IF(new.sku = skuProducto) THEN
      invProducto := (select stocksistema - stockfisico from Inventario where idinventario = new.idinventario);
      update producto set stocksistema = invProducto where sku = NEW.sku;
      vAlmacenP := (select preciopublico*stocksistema from producto where sku = new.sku);
      update producto set valoralmacen = vAlmacenP where sku = NEW.sku;
      return NEW;
   END IF;

   IF(new.sku = skuInsumo) THEN
      invInsumo := (select stocksistema - stockfisico from Inventario where idinventario = new.idinventario);
      update insumo set stocksistema = invInsumo where sku = NEW.sku;
      vAlmacenI := (select costounitario*stocksistema from insumo where sku = new.sku);
      update insumo set valoralmacen = vAlmacenI where sku = NEW.sku;
      return NEW;
   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger actualizar_InventariosPI after insert on inventario 
for each row execute procedure calculo_inventarios();

/* ENTRADA */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_cTotalE() RETURNS trigger AS
'
DECLARE
CTE decimal;
entradaInsumo integer;
cantidadInsumo integer;
cantidadEntrada integer;
totalinsumo integer;
vAlmacenInsumo decimal;

BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(new.sku IS NOT NULL) THEN

      CTE := (select cantidad * costounitario from entrada where folio = new.folio);
      update entrada set costototal = CTE where sku = NEW.sku;

      cantidadInsumo := (select stocksistema from insumo where sku = new.sku);
      cantidadEntrada := (select cantidad from entrada where folio = new.folio);
      totalInsumo := cantidadInsumo + cantidadEntrada;
      update insumo set stocksistema = totalInsumo where sku = new.sku;

      vAlmacenInsumo := (select costounitario*stocksistema from insumo where sku = new.sku);
      update insumo set valoralmacen = vAlmacenInsumo where sku = new.sku;
      return NEW;

   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger actualizar_costoTotal after insert or update on entrada 
for each row execute procedure calculo_cTotalE();


/* SALIDA */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_cTotalS() RETURNS trigger AS
'
DECLARE
cTotalSalida decimal;
stckSisP integer;
cantSalida integer;
cantTotal integer;
Va decimal;

BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(new.sku IS NOT NULL) THEN

      cTotalSalida := (select (cantidad * preciopublico)-((cantidad * preciopublico)*(descuento/100)) from salida where folio = new.folio);
      update salida set montototal = cTotalSalida where folio = new.folio;

      stckSisP := (select stocksistema from producto where sku = new.sku);
      cantSalida := (select cantidad from salida where folio = new.folio);
      cantTotal := stckSisP - cantSalida;
      update producto set stocksistema = cantTotal where sku = new.sku;

      Va := (select preciopublico * stocksistema from producto where sku = new.sku);
      update producto set valoralmacen = Va where sku = new.sku;
      return NEW;

   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger actualizar_montoTotal after insert or update on salida 
for each row execute procedure calculo_cTotalS();


-- Se agrego una secuencia al campo matricula para incrementar valor automaticamente
CREATE SEQUENCE matricula_seq;
ALTER TABLE usuario ALTER matricula SET DEFAULT NEXTVAL('matricula_seq');


--- Todos estos querys estan verificados y son funcionales

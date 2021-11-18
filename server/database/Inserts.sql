
--USUARIO
insert into Usuario values (DEFAULT,'Administrador', 'unach', 'john', 'de leon', 'faugier');
insert into Usuario values (DEFAULT,'Administrador', 'unach', 'jefri', 'ruiz', 'espinoza');
insert into Usuario values (DEFAULT,'Colaborador', 'unach', 'juan', 'barrientos', 'mazariegos');


--PROVEEDOR
insert into Proveedor values (DEFAULT, 'cafe tacana sa de cv', 'XAXX010101000', '9621234567', 'ventas@cafetacana.com', 'Carretera nueva alemania km 3');
insert into Proveedor values (DEFAULT, 'cafe soconusco sa de cv', 'XAXX010101001', '9621234567', 'ventas@cafesoconusco.com', 'Carretera nueva alemania km 8');


--CLIENTE
insert into Cliente values (DEFAULT, '9621234567', 'daniel@gmail.com', 'Daniel', 'Perez', 'Ramirez');
insert into Cliente values (DEFAULT, '9621234567', 'angel@hotmail.com', 'Angel', 'Sanchez', 'Cordero');
insert into Cliente values (DEFAULT, '9621234567', 'roberto@hotmail.com', 'Roberto', 'Sanchez', 'Lopez');

--PRODUCTO
insert into producto (sku, descripcion, precioUnitario, iva, stockSistema) 
    values (1, 'Bolsa de cafe molido de 500gr', 140, DEFAULT, 200);
insert into producto (sku, descripcion, precioUnitario, iva, stockSistema) 
    values (2, 'Bolsa de cafe tostado de 500gr', 135, DEFAULT, 56);

--INVENTARIO
insert into Inventario values 
    (1, DEFAULT, DEFAULT, 1, 'Bolsa de cafe molido de 500gr', 100, 43, 160.0);
insert into Inventario values 
    (2, DEFAULT, DEFAULT, 2, 'Bolsa de cafe tostado de 500gr', 30, 2, 160.0);

--INSUMO
insert into insumo (sku, descripcion, costoUnitario, unidadMedida, stockSistema)
    values (1, 'Cafe arabico exportacion', 160.00, 'Quintal', 30);
insert into insumo (sku, descripcion, costoUnitario, unidadMedida, stockSistema)
    values (2, 'Cafe robusta', 112.00, 'Quintal', 70);

--ENTRADA
insert into Entrada (folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario)
    values ('E001', 1, 1, DEFAULT, DEFAULT, 20, 230);
insert into Entrada (folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario)
    values ('E002', 2, 1, DEFAULT, DEFAULT, 20, 160);
insert into Entrada (folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario)
    values ('E003', 1, 1, DEFAULT, DEFAULT, 20, 230);

--SALIDA
insert into Salida (folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento)
    values ('S001', 1, 1, DEFAULT, DEFAULT, 10, 162.40, 10);
insert into Salida (folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento)
    values ('S002', 2, 1, DEFAULT, DEFAULT, 10, 156.6, 10);
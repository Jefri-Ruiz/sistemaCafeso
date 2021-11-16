/* PRODUCTO */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_valoresProducto() RETURNS trigger AS
'
DECLARE
precioIvaP decimal;
valorAlmacenP decimal;

BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(NEW.sku IS NOT NULL) THEN

      precioIvaP := (SELECT ((SELECT iva FROM producto WHERE sku = NEW.sku)/100)*preciounitario+preciounitario FROM producto WHERE sku = NEW.sku);
      UPDATE producto SET preciopublico = precioIvaP WHERE sku = NEW.sku;

      valorAlmacenP := (SELECT preciopublico*stocksistema FROM producto WHERE sku = NEW.sku);
      UPDATE producto SET valoralmacen = valorAlmacenP WHERE sku = NEW.sku;
      return NEW;
      
   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger accion_valoresProducto after insert or update on producto 
for each row execute procedure calculo_valoresProducto();


/* INSUMOS */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_valoresInsumo() RETURNS trigger AS
'
DECLARE
valorAlmacenI decimal;
BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(NEW.stocksistema IS NOT NULL) THEN
      valorAlmacenI := (SELECT costounitario*stocksistema FROM insumo WHERE sku = NEW.sku);
      UPDATE insumo SET valoralmacen = valorAlmacenI WHERE sku = NEW.sku;
      return NEW;
   END IF;
END;
' LANGUAGE plpgsql;
-- trigger  --
create trigger accion_valoresInsumo after insert or update on insumo  
for each row execute procedure calculo_valoresInsumo();

/* INVENTARIOS */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_inventario() RETURNS trigger AS
'
DECLARE
skuProducto smallint;
skuInsumo smallint;
invProducto integer;
invInsumo integer;
valorAlmacenP decimal;
valorAlmacenI decimal;

BEGIN
   skuProducto := (SELECT sku FROM producto WHERE sku = NEW.sku);
   skuInsumo := (SELECT sku FROM insumo WHERE sku = NEW.sku);
   
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;

   IF(NEW.sku = skuProducto) THEN
      invProducto := (SELECT stockfisico FROM inventario WHERE idinventario = NEW.idinventario);
      UPDATE producto SET stocksistema = invProducto WHERE sku = NEW.sku;
      valorAlmacenP := (SELECT preciopublico*stocksistema FROM producto WHERE sku = NEW.sku);
      UPDATE producto SET valoralmacen = valorAlmacenP WHERE sku = NEW.sku;
      return NEW;
   END IF;

   IF(NEW.sku = skuInsumo) THEN
      invInsumo := (SELECT stockfisico FROM inventario WHERE idinventario = NEW.idinventario);
      UPDATE insumo SET stocksistema = invInsumo WHERE sku = NEW.sku;
      valorAlmacenI := (SELECT costounitario*stocksistema FROM insumo WHERE sku = NEW.sku);
      UPDATE insumo SET valoralmacen = valorAlmacenI WHERE sku = NEW.sku;
      return NEW;
   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger actualizar_Inventario after insert or update on inventario 
for each row execute procedure calculo_inventario();

/* ENTRADA */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_costoTotalEntrada() RETURNS trigger AS
'
DECLARE
costoTotalE decimal;
entradaInsumo integer;
cantidadInsumo integer;
cantidadEntrada integer;
totalInsumo integer;
valorAlmacenI decimal;

BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(NEW.sku IS NOT NULL) THEN

      costoTotalE := (SELECT cantidad*costounitario FROM entrada WHERE folio = NEW.folio);
      UPDATE entrada SET costototal = costoTotalE WHERE folio = NEW.folio;

      cantidadInsumo := (SELECT stocksistema FROM insumo WHERE sku = NEW.sku);
      cantidadEntrada := (SELECT cantidad FROM entrada WHERE folio = NEW.folio);
      totalInsumo := cantidadInsumo + cantidadEntrada;
      UPDATE insumo SET stocksistema = totalInsumo WHERE sku = NEW.sku;

      valorAlmacenI := (SELECT costounitario*stocksistema FROM insumo WHERE sku = NEW.sku);
      UPDATE insumo SET valoralmacen = valorAlmacenI WHERE sku = NEW.sku;
      return NEW;

   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger actualizar_costoTotalEntrada after insert or update on entrada 
for each row execute procedure calculo_costoTotalEntrada();


/* SALIDA */
--  funcion  --
CREATE OR REPLACE FUNCTION calculo_costoTotalSalida() RETURNS trigger AS
'
DECLARE
costoTotalS decimal;
stockSistemaP integer;
cantSalida integer;
cantTotal integer;
valorAlmacenS decimal;

BEGIN
   IF pg_trigger_depth() <> 1 THEN
      RETURN NEW;
   END IF;
   IF(NEW.sku IS NOT NULL) THEN

      costoTotalS := (SELECT (cantidad*preciopublico)-((cantidad*preciopublico)*(descuento/100)) FROM salida WHERE folio = NEW.folio);
      UPDATE salida SET montototal = costoTotalS WHERE folio = NEW.folio;

      stockSistemaP := (SELECT stocksistema FROM producto WHERE sku = NEW.sku);
      cantSalida := (SELECT cantidad FROM salida WHERE folio = NEW.folio);
      cantTotal := stockSistemaP - cantSalida;
      UPDATE producto SET stocksistema = cantTotal WHERE sku = NEW.sku;

      valorAlmacenS := (SELECT preciopublico*stocksistema FROM producto WHERE sku = NEW.sku);
      UPDATE producto SET valoralmacen = valorAlmacenS WHERE sku = NEW.sku;
      return NEW;

   END IF;
END;
' LANGUAGE plpgsql;
--  trigger  --
create trigger actualizar_costoTotalSalida after insert or update on salida 
for each row execute procedure calculo_costoTotalSalida();
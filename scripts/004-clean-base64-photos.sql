-- Limpiar todas las fotos base64 existentes
UPDATE machines SET photo = NULL WHERE photo LIKE 'data:image%';

-- Verificar que se limpiaron correctamente
SELECT id, item, CASE WHEN photo IS NULL THEN 'NULL' ELSE 'HAS_PHOTO' END as photo_status FROM machines;
